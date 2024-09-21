import app from '../src/app';
import request from 'supertest';
import { firstRecords } from '../src/controllers/pokemon.controller';

describe('GET /pokemon', () => {

    test('Deberia dar una respuesta con codigo de estado 200', async () => {
        const response = await request(app).get('/api/pokemon').send();
        expect(response.statusCode).toBe(200);
    })

    test('Los dos deben ser objetos', async () => {
        const response = await request(app).get('/api/pokemon').send();
        expect(typeof response).toBe('object');
        expect(response).not.toBeNull();
        expect(Array.isArray(response)).toBe(false);
    })  


})

