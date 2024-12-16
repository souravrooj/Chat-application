import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';

afterAll(async () => {
    // Close MongoDB connection after tests
    await mongoose.connection.close();
});

describe('User API', () => {
    it('should return 404 for non-existent user', async () => {
        const res = await request(app).get('/api/users/nonexistent@example.com');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });

    it('should return 201 and create a new user', async () => {
        const newUser = { email: 'testd@example.com', name: 'Test User' };

        const res = await request(app)
            .post('/api/users')
            .send(newUser);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('email', newUser.email);
        expect(res.body).toHaveProperty('name', newUser.name);
    });

    it('should handle server errors gracefully', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({});

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: 'Internal Server Error' });
    });
});
