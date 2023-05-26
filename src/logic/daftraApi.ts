import { getSecrets } from './utils'
import type { NoteDataApi, SecretsType, WorkflowDataApi } from './types'

// Get All Workflows
export const GetAllWorkflows = async ({ sub_domain, apiKey }: Pick<SecretsType, 'sub_domain' | 'apiKey'>): Promise<Response> => {
  const res: Response = await fetch(`https://${sub_domain}.daftra.com/v2/api/entity/workflow_type/list`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
  })
  const data = await res.json()
  return data
}
// Get Site Info
export const GetSiteInfo = async ({ sub_domain, apiKey }: Pick<SecretsType, 'sub_domain' | 'apiKey'>): Promise<Response> => {
  // const { sub_domain, apiKey } = getSecrets()

  const res = await fetch(`https://${sub_domain}.daftra.com/api2/site_info`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
  })
  const data = await res.json()
  return data
}
// Get Notes
export const GetNotes = async (): Promise<Response> => {
  const { sub_domain, apiKey, noteModuleKey } = getSecrets()

  const res = await fetch(`https://${sub_domain}.daftra.com/v2/api/entity/${noteModuleKey}/list?per_page=100000`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apiKey,
    },
  })
  // const data = await res.json()
  return res
}
// Creat the D-Note Module
export const CreateNoteModule = async ({ sub_domain, apiKey }: Pick<SecretsType, 'sub_domain' | 'apiKey'>): Promise<Response> => {
  // const { sub_domain, apiKey } = getSecrets()
  const data: WorkflowDataApi = {
    name: 'D-Notes Module',
    status: 1,
    singular_title: 'Note',
  }

  const res: Response = await fetch(`https://${sub_domain}.daftra.com/v2/api/entity/workflow_type`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
    },
    body: JSON.stringify(data),
  })
  // const result = await res.json()
  return res

  // if (!res.ok)
  //   return data.
}
// Create a note
export const CreateNote = async ({ sub_domain, noteModuleKey, apiKey }: Pick<SecretsType, 'sub_domain' | 'noteModuleKey' | 'apiKey'>, data: NoteDataApi): Promise<string> => {
  // const { sub_domain, noteModuleKey, apiKey } = getSecrets()

  const res: Response = await fetch(`https://${sub_domain}.daftra.com/v2/api/entity/${noteModuleKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
    },
    body: JSON.stringify(data),
  })
  if (res.ok)
    return 'Note has been created successfully!'
  return res.statusText
}

// Update a note
export const UpdateNote = async (id: string, data: NoteDataApi): Promise<string> => {
  const { sub_domain, noteModuleKey, apiKey } = getSecrets()

  const res: Response = await fetch(`https://${sub_domain}.daftra.com/v2/api/entity/${noteModuleKey}/${id}`, {
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
  const { sub_domain, noteModuleKey, apiKey } = getSecrets()
  const res: Response = await fetch(`https://${sub_domain}.daftra.com/v2/api/entity/${noteModuleKey}/${id}`, {
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
