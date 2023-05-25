import { getSecrets } from './utils'
import type { NoteDataApi, WorkflowDataApi } from './types'

// Get All Workflows
export const GetAllWorkflows = async (apiK: string, subD: string): Promise<string> => {
  const res: Response = await fetch(`https://${subD}.daftra.com/api/v2/entity/workflow_types`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiK,
    },
  })
  const data = await res.json()
  return data.data[0].entity_key
}
// Get Site Info
export const GetSiteInfo = async () => {
  const { subdomain, apiKey } = getSecrets()

  const res = await fetch(`https://${subdomain}.daftra.com/api2/site_info`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
  })
  const data = await res.json()
  return data
}
// Get Notes
export const GetNotes = async () => {
  const { subdomain, apiKey, noteModuleKey } = getSecrets()

  const res = await fetch(`https://${subdomain}.daftra.com/v2/api/entity/${noteModuleKey}/list?per_page=100000`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
  })
  const data = await res.json()
  return data
}
// Creat the D-Note Module
export const CreateNoteModule = async (): Promise<string> => {
  const { subdomain, apiKey } = getSecrets()
  const data: WorkflowDataApi = {
    name: 'D-Notes Module',
    status: 1,
    singular_title: 'Note',
  }

  const res: Response = await fetch(`https://${subdomain}.daftra.com/v2/api/entity/workflow_type`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
    body: JSON.stringify(data),
  })

  if (res.ok)
    return 'Your Notes Module has created successfully!'
  return res.statusText
}
// Create a note
export const CreateNote = async (data: NoteDataApi): Promise<string> => {
  const { subdomain, noteModuleKey, apiKey } = getSecrets()

  const res: Response = await fetch(`https://${subdomain}.daftra.com/v2/api/entity/${noteModuleKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
    body: JSON.stringify(data),
  })
  if (res.ok)
    return 'Note has been created successfully!'
  return res.statusText
}

// Update a note
export const UpdateNote = async (id: string, data: NoteDataApi): Promise<string> => {
  const { subdomain, noteModuleKey, apiKey } = getSecrets()

  const res: Response = await fetch(`https://${subdomain}.daftra.com/v2/api/entity/${noteModuleKey}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
    body: JSON.stringify(data),
  })
  if (res.ok)
    return 'Note has been updated successfully!'
  return res.statusText
}
// Delete a note
export const DeleteNote = async (id: string): Promise<string> => {
  const { subdomain, noteModuleKey, apiKey } = getSecrets()
  const res: Response = await fetch(`https://${subdomain}.daftra.com/v2/api/entity/${noteModuleKey}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
  })
  if (res.ok)
    return 'Note has been deleted successfully!'
  return res.statusText
}
