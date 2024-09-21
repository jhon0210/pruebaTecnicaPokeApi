import { Router } from 'express';
import { firstRecords, consultaPokemon, languageTypes } from '../controllers/pokemon.controller';

const router =  Router();

router.get('/pokemon', firstRecords);

router.get('/pokemon/:id', consultaPokemon);

router.get('/pokemonAndTypes/:id', languageTypes);

export default router;
