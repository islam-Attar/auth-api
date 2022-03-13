'use strict';
process.env.SECRET = 'test' || process.env.SECRET;
const supertest = require('supertest');
const server = require('../src/server');
const { db } = require('../src/models/index.js');
const mockRequest = supertest(server.app);
console.log(mockRequest);

let id;
let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    writer: { username: 'writer', password: 'password', role: 'writer' },
    user: { username: 'user', password: 'password', role: 'user' },
};
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('V2 Test', () => {
    Object.keys(users).forEach(user => {
        describe(`${user} users`, () => {
            it.skip('create new record', async () => {
                const register = await mockRequest.post('/signup').send(users[user]);
                const token = register.body.token;

                const response = await mockRequest.post('/api/v2/movie').send({
                    movieName: "test",
                    releaseDate: "test"
                }).set("Authorization", `Bearer ${token}`);

                id = response.body.id
                console.log(response.body.id);


                if (user === 'writer' || user === 'editor' || user === 'admin') {
                    expect(response.status).toBe(201);
                } else {
                    expect(response.status).toBe(500);
                }
            });
            it.skip('get all records', async () => {
                let Auth = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                let token = Auth.body.token;
                const response = await mockRequest.get('/api/v2/movie').set('Authorization', `Bearer ${token}`)
                expect(response.status).toEqual(200)
            });
            it.skip('get one record', async () => {
                const register = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                const token = register.body.token;
                const response = await mockRequest.get(`/api/v2/movie/${id}`).set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(200);
            });
            it.skip('update record', async () => {
                const register = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                const token = register.body.token;


                const response = await mockRequest.put(`/api/v2/movie/${id}`).send({
                    movieName: "test1",
                    releaseDate: "test2"
                }).set("Authorization", `Bearer ${token}`);
                if (user == 'editor' || user == 'admin') {
                    expect(response.status).toBe(201);
                } else {
                    expect(response.status).toBe(500);
                }
            });
            it.skip('delete record', async () => {
                const register = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                const token = register.body.token;
                const response = await mockRequest.delete('/api/v2/movie/1').set('Authorization', `Bearer ${token}`);
                if (users[user].role === 'admin') {
                    expect(response.status).toBe(204);
                } else {
                    expect(response.status).not.toBe(204);
                }
            });
        });
    });
});
