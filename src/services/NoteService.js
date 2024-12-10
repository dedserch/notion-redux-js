import { instance } from "../api/axios"

export class NoteService {
  static async create(note) {
    const noteWithTimestamp = {
      ...note,
      createdAt: new Date().toISOString(),
    }
    const response = await instance.post("/notes", noteWithTimestamp)
    return response.data
  }

  static async findById(id) {
    const response = await instance.get(`/notes/${id}`)
    return response.data || null
  }

  static async getAll() {
    const response = await instance.get("/notes")
    return response.data
  }

  static async update(id, updatedNote) {
    const noteWithTimestamp = {
      ...updatedNote,
      createdAt: new Date().toISOString(),
    }
    const response = await instance.put(`/notes/${id}`, noteWithTimestamp)
    return response.data
  }

  static async delete(id) {
    await instance.delete(`/notes/${id}`)
  }
}
