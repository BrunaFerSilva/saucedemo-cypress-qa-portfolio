import { describe, it, expect } from 'vitest'
import request from 'supertest'

const baseUrl = 'https://jsonplaceholder.typicode.com'

describe('Users API', () => {
  it('returns a list of users', async () => {
    const response = await request(baseUrl).get('/users')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(10)
  })

  it('returns a single user by id', async () => {
    const response = await request(baseUrl).get('/users/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', 1)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
  })

  it('returns 404 for a non-existent user', async () => {
    const response = await request(baseUrl).get('/users/9999')

    expect(response.status).toBe(404)
  })
})