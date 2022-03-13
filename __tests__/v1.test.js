'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const {db} = require('../src/models/index')
let id;
beforeAll( async () =>{
    await db.sync();
})
afterAll( async () =>{
    await db.drop();
})

describe('testing movie model for v1 route',()=>{
 
    it ('post new sport', async () => {
        const response = await request.post('/api/v1/movie').send({
            movieName: "test",
            releaseDate : "test"
        });
        expect(response.status).toEqual(201);
        id = response.body.id
    });

    it('testing get all movies',async()=>{
        const response = await request.get('/api/v1/movie')
        expect(response.status).toEqual(200)
    })
        
    it ('testing movie get by id method',async()=>{
       const response = await request.get(`/api/v1/movie/${id}`)
       expect(response.status).toEqual(200);
   })
  

   it ('update new movie', async () => {
    const response = await request.put(`/api/v1/movie/${id}`).send({
        movieName: "test",
        releaseDate : "test"
    })
    expect(response.status).toEqual(201);
});

it ('deleting movie by id',async()=>{
    const response = await request.delete(`/api/v1/movie/${id}`)
    expect(response.status).toEqual(204);
})

})

