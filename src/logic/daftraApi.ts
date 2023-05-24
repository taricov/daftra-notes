import { GetSecretsCookie } from './utils'
import type { NoteDataApi, WorkflowDataApi } from './types'

// Get All Workflows
export const GetAllWorkflows = async (): Promise<string> => {
  const res: Response = await fetch(`https://${subD}.daftra.com/api/v2/entity/workflow_types`)
  const data = await res.json()
  return data.data[0].entity_key
}
// Get Site Info
export const GetSiteInfo = async () => {
  const { subD, apiK } = GetSecretsCookie()

  const res = await fetch(`https://${subD}.daftra.com/api2/site_info`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
  })
  const data = await res.json()
  return data
}
// Get Notes
export const GetNotes = async () => {
  const { subD, apiK, moduleK } = GetSecretsCookie()

  const res = await fetch(`https://${subD}.daftra.com/v2/api/entity/${moduleK}/list?per_page=100000`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
  })
  const data = await res.json()
  return data
}
// Creat the D-Note Module
export const CreateNoteModule = async (): Promise<string> => {
  const { subD, apiK } = GetSecretsCookie()
  const data: WorkflowDataApi = {
    name: 'D-Notes Module',
    status: 1,
    singular_title: 'Note',
  }

  const res: Response = await fetch(`https://${subD}.daftra.com/v2/api/entity/workflow_type`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
    body: JSON.stringify(data),
  })

  if (res.ok)
    return 'Your Notes Module has created successfully!'
  return res.statusText
}
// Create a note
export const CreateNote = async (data: NoteDataApi): Promise<string> => {
  const { subD, endP, apiK } = GetSecretsCookie()

  const res: Response = await fetch(`https://${subD}.daftra.com/v2/api/entity/${endP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
    body: JSON.stringify(data),
  })
  if (res.ok)
    return 'Note has been created successfully!'
  return res.statusText
}

// Update a note
export const UpdateNote = async (id: string, data: NoteDataApi): Promise<string> => {
  const { subD, endP, apiK } = GetSecretsCookie()

  const res: Response = await fetch(`https://${subD}.daftra.com/v2/api/entity/${endP}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
    body: JSON.stringify(data),
  })
  if (res.ok)
    return 'Note has been updated successfully!'
  return res.statusText
}
// Delete a note
export const DeleteNote = async (id: string): Promise<string> => {
  const { subD, endP, apiK } = GetSecretsCookie()
  const res: Response = await fetch(`https://${subD}.daftra.com/v2/api/entity/${endP}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
  })
  if (res.ok)
    return 'Note has been deleted successfully!'
  return res.statusText
}
