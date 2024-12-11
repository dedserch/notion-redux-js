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

  static async findById(id, userId) {
    const response = await instance.get(`/notes/${id}`)
    const note = response.data || null
    if (note && note.userId !== userId) {
      return null
    }
    return note
  }
  
  static async getAll(userId) {
    const response = await instance.get("/notes", {
      params: { userId },
    })
    return response.data.filter((note) => note.userId === userId)
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
