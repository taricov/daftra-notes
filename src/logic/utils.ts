// import { useCookies } from 'vue3-cookies'
import type { Note, SecretsType } from './types'

// const $cookies = inject<VueCookies>('$cookies')

// Set Stored secrets from cookie
export const setSecrets = ({ subdomain, apiKey, noteModuleKey, businessName, theme = 'dark' }: SecretsType): void => {
  // eslint-disable-next-line no-console
  console.log(subdomain, apiKey, noteModuleKey, businessName, theme)
  const sData = {
    subdomain, apiKey, noteModuleKey, businessName, theme,
  }
  // const { cookies } = useCookies()
  // cookies.set('myCoookie', 'abcdefg')
  // cookies.set('myCoookie2', JSON.stringify(sData))
  // document.cookie = 'dnotes=ffe'
  localStorage.setItem('connector-data', JSON.stringify(sData))
}

// Get Stored Secrets
export const getSecrets = () => {
  const secrets: any = localStorage.getItem('connector-data')
  const parsedSecrets: SecretsType = JSON.parse(secrets)

  // eslint-disable-next-line no-console
  console.log(parsedSecrets)
  return parsedSecrets
}

export const filteredNotes = (notes: Note[]): Array<Note> => {
  const thisUrlPath: string = window.location.pathname
  return notes.filter((note: Note) => (note.path === '/work-orders'))
}

export const GetNoteModule = () => {

}
