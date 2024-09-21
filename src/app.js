import express from 'express';
import routpokemon from './routes/pokemon.routes';

const app = express();

app.use(express.json());

app.use('/api/', routpokemon);

export default app;