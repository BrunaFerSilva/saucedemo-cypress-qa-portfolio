import { describe, it, expect } from 'vitest'
import request from 'supertest'

const baseUrl = 'https://jsonplaceholder.typicode.com'

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
      title: 'Meu primeiro post de teste',
      body: 'Conteúdo de exemplo para o teste de API',
      userId: 1
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
      title: 'Título atualizado via PATCH'
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
      title: 'Post sem userId'
    }

    const response = await request(baseUrl)
      .post('/posts')
      .send(incompletePost)

    expect(response.status).toBe(201)
    expect(response.body.title).toBe(incompletePost.title)
    expect(response.body.userId).toBeUndefined()
  })
})