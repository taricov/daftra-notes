<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import connectSound from '../assets/sound effects/connected2.mp3'
import { getSecrets, setSecrets } from '../logic/utils'
import { CreateUser, GetUser } from '../logic/dbSDK'
import type { User } from '../logic/types'
import { CreateNoteModule, GetAllWorkflows, GetSiteInfo } from '~/logic/daftraApi'
/* eslint no-console: */
// const panel = ref<number[]>([1, 0])
const isDisabled = ref<boolean>(false)
const returnedError = ref<any>()
const isConnected = ref<boolean>(false)
const snackbar = ref<boolean>(false)
const connectPanel = ref<Array<String>>([])
const freshInstall = ref<boolean>(true)
const loading = ref<boolean>(false)
// const accountKeys = ref<SecretsTypes>({
//   // theme: 'dark',
//   // lang: 'en',
// })
const userSecrets = ref<{ userEmail: string; apikey: string; noteModuleKey: string; userSub: string }>({
  apikey: '',
  userSub: '',
  userEmail: '',
  noteModuleKey: '',
  // theme: 'dark',
  // lang: 'en',
  // notesCount: 0,
})

onMounted(async () => {
  // isConnected.value = true
  const { userEmail, userSub } = getSecrets()
  // console.log(userEmail, userSub)
  // checking for user secret
  if (userSub) {
    console.log('we!')
    userSecrets.value.userEmail = userEmail
    userSecrets.value.userSub = userSub
    isConnected.value = true
    // GET user data
    const user: any = await GetUser('email', userSecrets.value.userEmail)
    console.log('existing user: ', user)

    if (user.total > 0) {
      userSecrets.value.noteModuleKey = user.noteModuleKey
      userSecrets.value.apikey = user.apikey
      console.log('we r live!')
    }

    if (user.total === 0)
      // isConnected.value = false
      loading.value = false
  }
})
async function submit() {
  // loading...
  returnedError.value = ''
  loading.value = true
  const connecedSound = new Audio(connectSound)
  const { apikey, userSub } = userSecrets.value
  // if (userEmail === getSecrets().userEmail && userSub === getSecrets().userSub) {
  // }
  const user: User = await GetUser('subdomain', userSub)
  console.log('existing user: ', user)
  if (+user.total === 0) {
    // Site info based on user inputs - if user does not exist
    // if (!user.ok) {
    // interface ResType { data: Record<string, unknown>}
    const siteData: any = await GetSiteInfo({ userSub, apikey })
    if (!siteData.ok) {
      loading.value = false
      userSecrets.value.userSub = ''
      userSecrets.value.apikey = ''
      // connectPanel.value = []

      returnedError.value = 'Either the domain or the API key is not valid! Please try again'
    }
    const { id, business_name, first_name, last_name, subdomain, address1, address2, city, state, phone1, phone2, country_code, currency_code, email, bn1 } = await siteData.data.Site
    userSecrets.value.userEmail = email
    try {
      const noteModule = await CreateNoteModule({ userSub, apikey })
      console.log(noteModule)
    }
    catch (err) {
      console.log(err, 'Something went wrong! Please try again')
    }
    // Fetching module entity_key
    const moduleKey: any = await GetAllWorkflows({ userSub, apikey })
    userSecrets.value.noteModuleKey = moduleKey.data[0].entity_key

    const userCreated = await CreateUser({ daftra_site_id: `${id}`, business_name, first_name, last_name, subdomain: subdomain.split('.')[0], address1, address2, city, state, phone1, phone2, lang: 'en', country_code, currency_code, email, bn1, api_key: userSecrets.value.apikey, note_module_key: userSecrets.value.noteModuleKey, prefer_dark: true })
    console.log(userCreated)
    connecedSound.play()
    setSecrets(userSecrets.value)
    console.log('user created successfully')
  }
  userSecrets.value.noteModuleKey = user.documents[0].noteModuleKey
  userSecrets.value.userEmail = user.documents[0].email
  isConnected.value = true
  loading.value = false
  connectPanel.value = []
  setSecrets(userSecrets.value)
  console.log('user fetched successfully')
  await connecedSound.play()
}

// if (userCreated.ok) {
//   setSecrets(userSecrets.value)
//   isConnected.value = true
//   loading.value = false
//   connectPanel.value = []
//   console.log('all set!')
// }
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    multi-line
    class="z-[1000000]"
    timeout="5000"
    color="light-blue-darken-4"
  >
    <div class="font-bold">
      You are connected!
    </div>
    <div class="">
      This button is disabled for security reasons and will not be re-activated unless you reset the connection from the lock 🔐 button.
    </div>

    <template #actions>
      <v-btn
        class="!bg-sky-300 !bg-opacity-50 !text-emerald-900"
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-expansion-panels
    v-model="connectPanel"
    :disabled="isDisabled"
    :readonly="isConnected"
    class="!w-9/12 m-auto !bg-opacity-5 mb-5"
  >
    <v-expansion-panel value="connect" class="!bg-opacity-5 !bg-sky-100 !text-sky-200">
      <v-expansion-panel-title expand-icon="false" collapse-icon="false" class="bg-opacity-20 !text-center" @click="isConnected ? snackbar = true : snackbar = false">
        <div v-if="isConnected" class="w-full text-center flex items-center justify-center space-x-2 ml-5">
          <b>Connected
          </b>
          <span class="m-0">
            <svg class="w-6 fill-emerald-600 rounded-full bg-emerald-600 bg-opacity-5 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Connected</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
          </span>
        </div>
        <div v-if="!isConnected" class="w-full text-center">
          Connect
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-sheet max-width="1000" class="mx-auto bg-transparent ">
          <v-form validate-on="submit lazy" @submit.prevent="submit">
            <v-text-field
              v-model="userSecrets.userSub"
              label="Daftra Subdomain"
              variant="underlined"
            />
            <v-text-field
              v-model="userSecrets.apikey"
              label="Api Key"
              variant="underlined"
            />

            <v-switch v-model="freshInstall">
              <template #label>
                First time to use?&nbsp;<span>{{ freshInstall ? "Yes" : "No" }}</span>
                <!-- <v-progress-circular
                  :indeterminate="!freshInstall"
                  size="24"
                  class="ms-2"
                /> -->
              </template>
            </v-switch>

            <v-text-field
              v-if="!freshInstall"
              v-model="userSecrets.noteModuleKey"
              label="Module Key"
              variant="underlined"
            />

            <v-btn
              :loading="loading"
              type="submit"
              variant="text"
              block
              class="mt-2"
              text="Submit"
            />
          </v-form>
        </v-sheet>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <div class="mt-3 text-red-500">
      {{ returnedError }}
    </div>
  </v-expansion-panels>
</template>

<style scoped>
/* .v-expansion-panel-title__overlay{
  @apply !text-center
} */
</style>
