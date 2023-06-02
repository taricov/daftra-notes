<!-- eslint-disable no-console -->
<script setup lang="ts">
import 'uno.css'
import { useClipboard, useMagicKeys, whenever } from '@vueuse/core'
import newNoteSound from '../../assets/sound effects/newNote.mp3'
// import notes from '../../fakedata'
import { CreateNote, GetNotes } from '../../logic/daftraApi'
// import { currPageNotes } from '../../logic/utils'
import type { NoteDataApi, User } from '../../logic/types'
import { GetUser } from '~/logic/dbSDK'
import { extractBody, extractColor, extractPath } from '~/logic/utils'

const tabs = ref<any>('recently-added')
// const filtered = ref<Note[]>([])
const apiNotes = ref<any>([])
// const apiNotes = ref<Note[]>([])

// filtered.value = currPageNotes(notes)

const noteTextarea = ref<HTMLTextAreaElement>()
// const placeholder = ref<string>('')
const notingDisabled = ref<boolean>(true)
const apikey = ref<string>('')
const subD = ref<string>('')
const moduleKey = ref<string>('')
const form = ref<HTMLFormElement>()
const isLoading = ref<boolean>(false)
const loadingNotes = ref<boolean>(false)
const drawer = ref<boolean>(false)
const newNote = ref<any>('')
// const newNote = ref<string | ComputedRef<string>>('')
const userE = ref<any>('')
const isConnected = ref<any>(true)
const renderError = ref<string | null>(null)

const toggleDrawer = (): void => {
  drawer.value = !drawer.value
  noteTextarea.value?.focus()
}

const thisPageNotes = () => {
  const thisPath = window.location.pathname
  return apiNotes.value.filter(n =>
    extractPath(n.description) === thisPath)
}

onMounted(async () => {
  thisPageNotes()
  loadingNotes.value = true
  // const { userEmail, userSub } = getSecrets()
  function getStorageValuePromise(key: string) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, resolve)
    })
  }

  const chromeStorage1: any = await getStorageValuePromise('conn')
  const chromeStorage2: any = await getStorageValuePromise('email')
  isConnected.value = chromeStorage1.conn
  userE.value = chromeStorage2.email
  if (isConnected && userE.value) {
    const user: User = await GetUser('email', userE.value)
    // console.log(user)
    notingDisabled.value = false
    moduleKey.value = user.documents[0].note_module_key
    apikey.value = user.documents[0].api_key
    subD.value = user.documents[0].subdomain
    // console.log(apikey.value, moduleKey.value)
    const allNotesReq = await GetNotes(subD.value, apikey.value, moduleKey.value)
    const allNotes = await allNotesReq.json()
    apiNotes.value = allNotes.data
    // console.log(apiNotes.value)
    loadingNotes.value = false
  }
})

const addNote = async (): Promise<void> => {
  const VClipboard = useClipboard()
  VClipboard.copy(newNote.value)
  console.log(VClipboard.text)
  form.value?.reset()
  const today = new Date()
  const formattedToday = today.toISOString().split('T')[0]
  const noteNun = apiNotes.value.length + 1
  const thisPath: string = window.location.pathname
  const data: NoteDataApi = {
    number: {
      generated: '1',
      code: '1',
    },
    title: `Note no. ${noteNun}`,
    start_date: formattedToday,
    description: `${newNote.value}|path:${thisPath}`,
    staff_id: '0',

  }
  const msgSound: any = new Audio(newNoteSound)
  msgSound.play()
  loadingNotes.value = true
  const secrets: any = { userSub: subD.value, noteModuleKey: moduleKey.value, apikey: apikey.value }
  const sendNote = await CreateNote(secrets, data)
  console.log(sendNote)
  // console.log(JSON.stringify(data))
  if (!sendNote.ok) {
    renderError.value = 'Adding Note Failed!'
    setTimeout(() => {
      renderError.value = null
    }, 10000)
    newNote.value = VClipboard.text
  }
  const allNotesReq = await GetNotes(subD.value, apikey.value, moduleKey.value)
  const allNotes = await allNotesReq.json()
  apiNotes.value = allNotes.data
  loadingNotes.value = false
}

const keys = useMagicKeys()
whenever(keys.escape, () => {
  drawer.value = false
})
whenever(keys['\\'], () => {
  drawer.value = true
  console.log('before', newNote.value)
  newNote.value = 'Hello....'
  console.log('after', newNote.value)
  // noteTextarea.value?.focus()
  newNote.value = ''
})
</script>

<template>
  <div
    class="group fixed flex items-center justify-center right-0 bottom-0 m-5 z-100 font-sans select-none leading-1em w-10 h-10 rounded-full shadow cursor-pointer bg-[#21a6a7] hover:bg-opacity-90 transition-all duration-300 !z-[100000]"
    @click="toggleDrawer"
  >
    <svg class="w-[1.5rem] mt-[3px] ml-[5px] fill-sky-900 group-hover:fill-sky-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.06 116.67"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M0,41.38V101.2H43.71V78.32c-1.54.13-3.16.2-4.88.2H26.36V22.68H38.83q27.93,0,27.93,27.35H93.12q0-23.41-13.18-36.71T43.51,0H0V41.38" /><path class="cls-1" d="M44.17,74.2V53.1h6.19l3.56,13v-13h5.15V74.2H53l-3.69-13v13Z" /><path class="cls-1" d="M74.56,66.22A11.31,11.31,0,0,1,73.4,72q-1.56,2.63-5.64,2.63-4.26,0-5.74-2.48Q61,70.36,61,66.19a11.3,11.3,0,0,1,1.15-5.76q1.57-2.62,5.65-2.63c2.83,0,4.75.83,5.73,2.48Q74.56,62.07,74.56,66.22Zm-8.28,0c0,1.68,0,2.64.06,2.9.18,1.38.65,2.07,1.42,2.07s1.24-.69,1.42-2.07c0-.27.06-1.24.06-2.9s0-2.65-.06-2.92c-.18-1.38-.65-2.07-1.42-2.07s-1.24.7-1.42,2.1C66.3,63.58,66.28,64.55,66.28,66.22Z" /><path class="cls-1" d="M75.21,61.79V58.21H77V53.49H82.3v4.72h2.1v3.58H82.3v7.65a1.11,1.11,0,0,0,1.27,1.25h.83v3.54a23.52,23.52,0,0,1-2.9.18A6,6,0,0,1,78,73.7c-.69-.55-1-1.68-1-3.38V61.79Z" /><path class="cls-1" d="M98.26,67.11H90.37v2.1c0,1.44.48,2.16,1.43,2.16s1.49-.93,1.49-2.78h4.79q-.09,6-6.25,6-3.81,0-5.29-1.89c-1-1.26-1.49-3.43-1.49-6.51s.53-5.19,1.59-6.48,2.8-1.94,5.21-1.94c2.2,0,3.81.55,4.81,1.66s1.6,3.21,1.6,6Zm-5-2.9v-.7q0-2.46-1.47-2.46c-1,0-1.45.82-1.45,2.46v.7Z" /><path class="cls-1" d="M99.18,69.24h4.67a2.64,2.64,0,0,0,.4,1.6,1.3,1.3,0,0,0,1.1.53,1.7,1.7,0,0,0,1.1-.37,1.25,1.25,0,0,0,.44-1c0-.73-.67-1.32-2-1.78a22.46,22.46,0,0,1-3.69-1.5,4.83,4.83,0,0,1-.45-7.48,7.12,7.12,0,0,1,4.79-1.45q6,0,6,5h-4.61c0-1.19-.47-1.78-1.42-1.78s-1.36.42-1.36,1.24.67,1.22,2,1.63a16.39,16.39,0,0,1,3.7,1.42,4.32,4.32,0,0,1,2,3.93,4.87,4.87,0,0,1-1.69,3.84,7,7,0,0,1-4.73,1.51C101.26,74.62,99.18,72.83,99.18,69.24Z" /></g></g></svg>

    <!-- <svg class="w-[1.5rem] mt-[3px] ml-[5px] fill-sky-900 group-hover:fill-sky-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.06 116.67"><defs /><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M0,41.38V101.2H43.71V78.32c-1.54.13-3.16.2-4.88.2H26.36V22.68H38.83q27.93,0,27.93,27.35H93.12q0-23.41-13.18-36.71T43.51,0H0V41.38" /><text class="cls-2" transform="translate(42.87 72.2)">Notes</text></g></g></svg> -->
    <!-- <svg class="w-[1.5rem] mt-[3px] ml-[5px] fill-sky-900 group-hover:fill-sky-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.06 116.67"><defs /><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M44.77,90.53H30.4V26.15H44.77Q77,26.15,77,57.68h30.39q0-27-15.2-42.32T50.17,0H0V116.67H50.4V90.3C48.61,90.45,46.75,90.53,44.77,90.53Z" /><path class="cls-1" d="M93,41.63c-1.88,2.18-3.86,4.28-5.61,6.56-1.6,2.08-3,4.33-4.4,6.55-.66,1-1.33,1-2.2.29-1.86-1.46-3.73-2.91-5.65-4.3-1-.71-.92-1.3-.2-2.18,4.07-5,8.24-10,12.11-15.16s7-10.5,10.84-15.52C101.31,13.37,105.19,9.2,109,5a2,2,0,0,1,1.9-.35,32.17,32.17,0,0,1,4.47,3.15c1,.84,1,1.92.24,3.1-1.88,2.93-1.83,3,.88,5.07,1.36,1.06,1.51,1.73.28,3.64-1.81,2.83-3.63,5.68-5.71,8.31A121.24,121.24,0,0,1,94.83,44.44a7.17,7.17,0,0,1-2,.84A20.54,20.54,0,0,1,92.44,43a6.32,6.32,0,0,1,.31-1.52Zm20.09-20.12c-.64-.58-1-.83-1.25-1.14-1.06-1.19-1.8-1-2.65.33a49,49,0,0,1-3.41,4.35c-3.72,4.44-7.46,8.85-11.19,13.28a14.06,14.06,0,0,0-.85,1.3,7,7,0,0,0,6-2.63c2-2.32,4.31-4.32,6.3-6.62C108.44,27.52,110.7,24.5,113.08,21.51Z" /><path class="cls-1" d="M74.13,50.72c2.37,1.8,4.73,3.54,7,5.38.23.19.19,1.09-.05,1.46A122.67,122.67,0,0,1,66.42,76.48a26.17,26.17,0,0,1-2.77,2.8,2.64,2.64,0,0,1-2.18.49,17.27,17.27,0,0,1-3.75-2.5c-1.28-1.09-1.27-2.31-.37-3.85A122.89,122.89,0,0,1,74.13,50.72Z" /><path class="cls-1" d="M55.41,77.4l5.73,4.3c-2.34,3.19-6.29,4.68-10,7.13C52.62,84.7,52.85,80.48,55.41,77.4Z" /></g></g></svg> -->
  </div>

  <v-layout id="my-content-script">
    <v-navigation-drawer
      v-model="drawer"
      width="600"
      elevation="9"
      location="right"
      temporary
      class="!bg-gray-900 py-3 px-1 !z-[100000]"
    >
      <v-container>
        <h3 class="text-left text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-xl font-extrabold md:text-xl lg:text-3xl dark:text-white">
          Recent Notes
        </h3>
        <v-chip variant="tonal" class="block text-left text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 px-0 mb-4 text-xl font-extrabold  dark:text-white">
          Free and Open Source Tool
        </v-chip>
        <v-tabs
          v-model="tabs"
          fixed-tabs
        >
          <v-tab
            v-ripple="false"
            class="bg-sky-500 hover:!bg-sky-600 active:!bg-transparent transition duration-300" value="recently-added"
            variant="outlined"
          >
            Recently Added
          </v-tab>
          <v-tab
            v-ripple="false"
            class="bg-sky-500 hover:!bg-sky-600 transition duration-300" value="page-notes"
            variant="outlined"
          >
            Page Notes
          </v-tab>
        </v-tabs>
        <v-window v-model="tabs">
          <v-window-item
            value="page-notes"
          >
            <v-container class="!bg-slate-100 !bg-opacity-2 text-center ">
              <!-- <v-progress-circular v-show="loadingNotes" color="green" indeterminate /> -->
              <p v-show="renderError !== null" class="w-full text-center text-red-500 font-semibold">
                {{ renderError }}
              </p>
              <v-row no-gutters>
                <v-col
                  v-for="note in thisPageNotes()"
                  :key="note.id"
                  cols="6"
                  sm="4"
                >
                  <v-text v-if="!isConnected && !userE" class="text-3xl font-bold">
                    Please Connect to start using the app...
                  </v-text>
                  <v-text v-if="!isConnected && apiNotes.length === 0" class="text-3xl font-bold">
                    You don't have any notes to display, start noting..
                  </v-text>
                  <VueCompact v-if="isConnected && userE" class="m-2" :body="extractBody(note.description)" :author="note.staff_id === 0 ? 'Admin' : `User ID: #${note.staff_id}`" :date="note.start_date" :path="note.description.split('[path]')[1]" />
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item
            value="recently-added"
          >
            <v-container class="!bg-slate-100 !bg-opacity-2 text-center">
              <v-progress-circular v-show="loadingNotes" color="green" indeterminate />

              <v-row no-gutters>
                <v-col
                  v-for="note in apiNotes.slice(0, 6)"
                  :key="note.id"
                  cols="6"
                  sm="4"
                >
                  <v-text v-if="!isConnected && !userE">
                    Please Connect to start using the app...
                  </v-text>
                  <v-text v-if="isConnected && apiNotes.length === 0">
                    You don't have any notes to display, start noting..
                  </v-text>
                  <VueCompact v-if="isConnected && userE" class="m-2" :color="extractColor(note.description)" :body="extractBody(note.description)" :author="note.staff_id === 0 ? 'Admin' : `User ID: #${note.staff_id}`" :date="note.start_date" :path="note.description.split('[path]')[1]" />
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
        <!-- <v-container class="!bg-slate-100 !bg-opacity-2"> -->
        <!-- <v-text size="x-small" class="text-xs hover:opacity-50 text-sky-100 bg-opacity-1 mx-3 cursor-pointer transition duration-300 font-normal" @click="openOptionsPage">
            Go to all notes..
          </v-text>
          <button class="btn mt-2" @click="openOptionsPage">
            Options
          </button> -->
        <!-- </v-container> -->
      </v-container>
      <v-container fluid>
        <form ref="form" @submit.prevent="addNote">
          <v-textarea
            ref="noteTextarea"
            v-model="newNote"
            :disabled="notingDisabled"
            required
            no-resize
            label="Press Shift + Enter to add notes"
            variant="outlined"
            class="text-gray-200"
            :loading="isLoading"
            @keyup.enter="addNote"
          />
        </form>
      </v-container>
    </v-navigation-drawer>
  </v-layout>
</template>

<style>
.v-navigation-drawer__scrim{
  position: fixed
}
.v-navigation-drawer__content{
  @apply !flex flex-col justify-between overflow-hidden;
}
.v-btn__overlay{
  @apply hidden
}
button:not(.v-tab--selected){
  @apply transform translate-y-2
}

.cls-1{fill:#0c4a6e;}
</style>
