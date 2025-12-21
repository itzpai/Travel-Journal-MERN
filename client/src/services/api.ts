import axios from 'axios'
import { TravelEntry, TravelEntryFormData, ApiResponse } from '../types'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAllEntries = async (): Promise<TravelEntry[]> => {
  const response = await api.get<ApiResponse<TravelEntry[]>>('/entries')
  return response.data.data || []
}

export const getEntryById = async (id: string): Promise<TravelEntry> => {
  const response = await api.get<ApiResponse<TravelEntry>>(`/entries/${id}`)
  if (!response.data.data) {
    throw new Error('Entry not found')
  }
  return response.data.data
}

export const createEntry = async (formData: TravelEntryFormData): Promise<TravelEntry> => {
  const response = await api.post<ApiResponse<TravelEntry>>('/entries', formData)
  if (!response.data.data) {
    throw new Error(response.data.error || 'Failed to create entry')
  }
  return response.data.data
}

export const updateEntry = async (id: string, formData: Partial<TravelEntryFormData>): Promise<TravelEntry> => {
  const response = await api.put<ApiResponse<TravelEntry>>(`/entries/${id}`, formData)
  if (!response.data.data) {
    throw new Error(response.data.error || 'Failed to update entry')
  }
  return response.data.data
}

export const deleteEntry = async (id: string): Promise<void> => {
  await api.delete(`/entries/${id}`)
}

