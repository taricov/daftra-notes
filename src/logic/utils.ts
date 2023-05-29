// import { useCookies } from 'vue3-cookies'
import type { Note, SecretsTypes } from './types'

// const $cookies = inject<VueCookies>('$cookies')

// Set Stored secrets from cookie
export const setSecrets = ({ userEmail, userSub }: SecretsTypes): void => {
  const sData = { userEmail, userSub }
  // export const setSecrets = ({ sub_domain, apiKey, noteModuleKey, businessName, theme, lang, connectionStatus, notesCount }: SecretsType): void => {
  //   const sData = {
  //     sub_domain, apiKey, noteModuleKey, businessName, theme, lang, connectionStatus, notesCount,
  //   }
  // const { cookies } = useCookies()
  // cookies.set('myCoookie', 'abcdefg')
  // cookies.set('myCoookie2', JSON.stringify(sData))
  // document.cookie = 'dnotes=ffe'
  localStorage.setItem('connector-data', JSON.stringify(sData))
}

// Get Stored Secrets
export const getSecrets = (): SecretsTypes => {
  const secrets: string = localStorage.getItem('connector-data') ?? '{}'
  const parsedSecrets: SecretsTypes = JSON.parse(secrets)

  return parsedSecrets
}

export const currPageNotes = (notes: Note[]): Array<Note> => {
  const thisUrlPath: string = window.location.pathname
  return notes.filter((note: Note) => (note.path === '/work-orders'))
}

export const GetNoteModule = () => {

}
