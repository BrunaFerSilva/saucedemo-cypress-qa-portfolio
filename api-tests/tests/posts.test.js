import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { Chance } from 'chance'

const baseUrl = 'https://jsonplaceholder.typicode.com'
const chance = new Chance()

describe('Posts API', () => {
  it('returns comments for a specific post', async () => {
    const response = await request(baseUrl).get('/posts/1/comments')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)

    // cada comentário deve pertencer ao post 1
    response.body.forEach((comment) => {
      expect(comment.postId).toBe(1)
    })
  })

  it('creates a new post', async () => {
    const newPost = {
      title: chance.sentence({ words: 5 }),
      body: chance.paragraph({ sentences: 2 }),
      userId: chance.integer({ min: 1, max: 10 })
    }

    const response = await request(baseUrl)
      .post('/posts')
      .send(newPost)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.title).toBe(newPost.title)
    expect(response.body.userId).toBe(newPost.userId)
  })

  it('updates an existing post', async () => {
    const updates = {
      title: chance.sentence({ words: 4 })
    }

    const response = await request(baseUrl)
      .patch('/posts/1')
      .send(updates)

    expect(response.status).toBe(200)
    expect(response.body.title).toBe(updates.title)
    expect(response.body.id).toBe(1)
  })

  it('deletes a post', async () => {
    const response = await request(baseUrl).delete('/posts/1')

    expect(response.status).toBe(200)
  })

  it('handles a post creation with missing fields', async () => {
    const incompletePost = {
      title: chance.sentence({ words: 3 })
    }

    const response = await request(baseUrl)
      .post('/posts')
      .send(incompletePost)

    expect(response.status).toBe(201)
    expect(response.body.title).toBe(incompletePost.title)
    expect(response.body.userId).toBeUndefined()
  })
})