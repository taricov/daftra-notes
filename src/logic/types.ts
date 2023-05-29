export interface NoteDataApi {
  number: number
  id: number
  title: string
  start_date: Date
  description: string
}

export interface Number {
  generated: string
  code: string
}
export interface WorkflowDataApi {
  name: string
  status: number
  singular_title: string
}

export interface Note {

  id: string
  body: string
  date: string
  author: string
  path: string
}

export interface SecretsType {
  sub_domain: string
  businessName: string
}
export interface SecretsTypes {
  userSub: string
  userEmail: string
  apikey: string
  noteModuleKey: string
  // theme: string
  // lang: string
  // notesCount: number
}
export interface User {
  userSub: string
  userEmail: string
  apikey: string
  noteModuleKey: string
}
