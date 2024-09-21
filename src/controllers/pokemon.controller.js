import express from 'express';
import app from '../app';
import { createClient } from 'redis';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST || 'redis',  
        port: process.env.REDIS_PORT || 6379,
      }
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

export const firstRecords =  async (req, res) => {
    try {
        const clave = await client.exists('registrosFirst');
         if (clave) {
            const value = await client.get('registrosFirst');
            res.json(JSON.parse(value));
            console.log('Data extraida de la cache de Redis');
         } else {
            const result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
            const data = await result.json();
            res.json(data);
            console.log('Data extraida de la api pokeAPI');

            await client.set('registrosFirst', JSON.stringify(data), {
                EX: 10,
              });
         }

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Ha ocurrido un error'       
        })
    }
};

export const consultaPokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const claveCons = await client.exists('consultaPockemon');
         if (claveCons) {
            const value = await client.get('consultaPockemon');
            res.json(JSON.parse(value));
            console.log('Data extraida de la cache de Redis');
         } else {
            const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon = await results.json();
            const result = {
                nombre: pokemon.name,
                tipos: pokemon.types.map(type => ({
                  tipo: type.type.name,
                  ranura: type.slot,
                  url: type.type.url
                }))
              };
            res.json(result);
            console.log('Data extraida de la api pokeAPI');

            await client.set('consultaPockemon', JSON.stringify(result), {
                EX: 10,
              });
         }

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Ha ocurrido un error'
            
        })
    }
    
}

export const languageTypes = async (req, res) => {
  try {
    const { id } = req.params;
    const claveLang = await client.exists('idiomaPockemon');
    if (claveLang) {
      const value = await client.get('idiomaPockemon');
      res.json(JSON.parse(value));
      console.log('Data extraida de la cache de Redis');
    } else {
      const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const { data: typeInfo } = await axios.get(pokemon.types[0].type.url);
      
      const response = {
        nombre: pokemon.name,
        tipos: pokemon.types.map(t => ({
          ranura: t.slot,
          tipo: {
            nombre: t.type.name,
            url: t.type.url
          }
        })),
        nombres: typeInfo.names.map(n => ({
          idioma: {
            nombre: n.language.name,
            url: `https://pokeapi.co/api/v2/language/${n.language.name}/`
          },
          nombre: n.name
        }))
      };

      res.json(response);
      console.log('Data extraida de la api pokeAPI');
      await client.set('idiomaPockemon', JSON.stringify(response), {
          EX: 10,
        });
    } 
  } catch (error) {
    res.status(500).send('Error al obtener los datos');
  }

}