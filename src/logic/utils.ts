// import { useCookies } from 'vue3-cookies'
import type { Note } from './types'
interface SecretsType {
  subD: string
  apiK: string
  endP: string
  theme: string
}

// const $cookies = inject<VueCookies>('$cookies')

// Set Stored secrets from cookie
export const SetSecretsCookie = ({ subD, apiK, endP }: Omit<SecretsType, 'theme'>): void => {
  // eslint-disable-next-line no-console
  console.log(subD, apiK, endP)
  const sData: SecretsType = {
    subD,
    endP,
    apiK,
    theme: 'dark',
  }
  // const { cookies } = useCookies()
  // cookies.set('myCoookie', 'abcdefg')
  // cookies.set('myCoookie2', JSON.stringify(sData))
  // document.cookie = 'dnotes=ffe'
  localStorage.setItem('connector-data', JSON.stringify(sData))
}

// Get Stored Secrets
export const GetSecretsCookie = () => {
  const secrets: any = localStorage.getItem('connector-data')
  const parsed = secrets ?? JSON.parse(secrets)

  const { subD, endP, apiK, moduleK } = parsed
  // eslint-disable-next-line no-console
  console.log(parsed)
  return { subD, endP, apiK, moduleK }
}

export const filteredNotes = (notes: Note[]): Array<Note> => {
  const thisUrlPath: string = window.location.pathname
  return notes.filter((note: Note) => (note.path === '/work-orders'))
}

export const GetNoteModule = () => {

}
