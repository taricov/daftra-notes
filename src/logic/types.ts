export interface NoteDataApi {
  number: Number
  id: number
  title: string
  start_date: string
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
