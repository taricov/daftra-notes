import { getSecrets } from './utils'
import type { NoteDataApi, SecretsTypes, WorkflowDataApi } from './types'

// Get All Workflows
export const GetAllWorkflows = async ({ userSub, apikey }: Pick<SecretsTypes, 'userSub' | 'apikey'>): Promise<Response> => {
  const res: Response = await fetch(`https://${userSub}.daftra.com/v2/api/entity/workflow_type/list`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
  })
  const data = await res.json()
  return data
}
// Get Site Info
export const GetSiteInfo = async ({ userSub, apikey }: Pick<SecretsTypes, 'userSub' | 'apikey'>): Promise<Response> => {
  // const { userSub, apikey } = getSecrets()

  const res = await fetch(`https://${userSub}.daftra.com/api2/site_info`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
  })
  const data = await res.json()
  return data
}
// Get Notes
export const GetNotes = async (userSub: string, apikey: string, noteModuleKey: string): Promise<Response> => {
  // const { userSub, apikey, noteModuleKey } = getSecrets()

  const res = await fetch(`https://${userSub}.daftra.com/v2/api/entity/${noteModuleKey}/list?per_page=100000`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
  })
  // const data = await res.json()
  return res
}
// Creat the D-Note Module
export const CreateNoteModule = async ({ userSub, apikey }: Pick<SecretsTypes, 'userSub' | 'apikey'>): Promise<Response> => {
  // const { userSub, apikey } = getSecrets()
  const data: WorkflowDataApi = {
    name: 'D-Notes Module',
    status: 1,
    singular_title: 'Note',
  }

  const res: Response = await fetch(`https://${userSub}.daftra.com/v2/api/entity/workflow_type`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
    body: JSON.stringify(data),
  })
  // const result = await res.json()
  return res

  // if (!res.ok)
  //   return data.
}
// Create a note
export const CreateNote = async ({ userSub, noteModuleKey, apikey }: Pick<SecretsTypes, 'userSub' | 'noteModuleKey' | 'apikey'>, data: NoteDataApi): Promise<Response> => {
  // console.log(userSub, noteModuleKey, apikey)

  const res: Response = await fetch(`https://${userSub}.daftra.com/v2/api/entity/${noteModuleKey}`, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
    body: JSON.stringify(data),
  })
  // if (res.ok)
  // return 'Note has been created successfully!'
  return res
}

// Update a note
export const UpdateNote = async (id: string, data: NoteDataApi): Promise<string> => {
  const { userSub, noteModuleKey, apikey } = getSecrets()

  const res: Response = await fetch(`https://${userSub}.daftra.com/v2/api/entity/${noteModuleKey}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
    body: JSON.stringify(data),
  })
  if (res.ok)
    return 'Note has been updated successfully!'
  return res.statusText
}
// Delete a note
export const DeleteNote = async (id: string): Promise<string> => {
  const { userSub, noteModuleKey, apikey } = getSecrets()
  const res: Response = await fetch(`https://${userSub}.daftra.com/v2/api/entity/${noteModuleKey}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
    },
  })
  if (res.ok)
    return 'Note has been deleted successfully!'
  return res.statusText
}
