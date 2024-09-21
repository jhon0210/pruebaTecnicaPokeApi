import express from 'express';
import app from './app';


const PORT = 3000;

app.listen(PORT, () => {
    console.log('Esta api se esta ejecutando en el puerto 3000')
})