// import { useCookies } from 'vue3-cookies'
import type { Note } from './types'

// const $cookies = inject<VueCookies>('$cookies')

// Set Stored secrets from cookie
export const SetSecretsCookie = (subD: string, apiK: string, endP: string): void => {
  const sData: { subD: string; apiK: string; endP: string } = {
    subD,
    endP,
    apiK,
  }
  // const { cookies } = useCookies()
  // cookies.set('myCoookie', 'abcdefg')
  // cookies.set('myCoookie2', JSON.stringify(sData))
  document.cookie = 'dnotes=ffe'
  localStorage.setItem('connector-data', JSON.stringify(sData))
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
