import type { Note } from './types'

// Set Stored secrets from cookie
export const SetSecretsCookie = (subD: string, apiK: string, endP: string): boolean => {
  // let sData: { subD: string; apiK: string; endP: string }
  // if (!endP || endP.length === 0)'' {
  //   sData = {
  //     subD,
  //     endP,
  //     apiK,
  //   }
  // }

  return true
}

// Get Stored Secrets
export const GetSecretsCookie = () => {
  const subD = ''
  const endP = ''
  const apiK = ''
  const moduleK = ''

  return { subD, endP, apiK, moduleK }
}

export const filteredNotes = (notes: Note[]): Array<Note> => {
  const thisUrlPath: string = window.location.pathname
  return notes.filter((note: Note) => (note.path === '/work-orders'))
}

export const GetNoteModule = () => {

}
