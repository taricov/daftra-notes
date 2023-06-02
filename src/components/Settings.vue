<!-- eslint-disable no-console -->
<script setup lang="ts">
import { getSecrets } from '~/logic/utils'

defineProps({ openSettings: Boolean })
// const connected = ref<boolean>(false)

const businessNameKnown = ref<string | null>(null)
const currtheme = ref<string | null>(null)
const currLang = ref<string>('en')
const soundToggle = ref<Boolean>(true)

onMounted(() => {
  try {
    const { userSub } = getSecrets()

    businessNameKnown.value = userSub || 'Notes'
    // currtheme.value = theme || 'dark'
    // connected.value = !!noteModuleKey
  }
  catch (err) {
    console.log(err)
  }
})

const toggleTheme = () => {
  currtheme.value === 'dark' ? currtheme.value = 'light' : currtheme.value = 'dark'
  // eslint-disable-next-line no-console
  console.log(currtheme.value)
}
const toggleLang = () => {
  currLang.value === 'en' ? currLang.value = 'ar' : currLang.value = 'en'
  // eslint-disable-next-line no-console
  console.log(currLang.value)
}
const resetWarning = ref<Boolean>(false)
const resetSecrets = () => {
  resetWarning.value = false
  setTimeout(() => {
    window.location.reload()
  }, 1000)
  localStorage.removeItem('connector-data')
}
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="50%"
    :is-active="openSettings"
    class=""
  >
    <v-snackbar
      v-model="resetWarning"
      multi-line
      class="z-[1000000]"
      timeout="5000"
      color="red-darken-3"
    >
      <div class="font-bold text-yellow-400">
        Warning!
      </div>
      <div class="">
        This button will reset the connection and remove your securely saved credentials. If you still want to revok the connection, Double click the lock button.
      </div>
    </v-snackbar>
    <v-card class="!bg-gray-900 shadow-lg">
      <v-container class="flex justify-between">
        <div>
          <h3 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-xl font-extrabold md:text-xl lg:text-3xl dark:text-white">
            Settings
          </h3>
          <p variant="tonal" class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 px-0 mb-4 text-xl font-extrabold  dark:text-white">
            Connet your Daftra
          <!-- and cusomize the look to your likings -->
          </p>
        </div>
        <v-btn class="group !opacity-40 w-fit !bg-opacity-5 !shadow-none hover:shadow-lg transition duration-300 !bg-sky-200 overflow-hidden" @click="resetWarning = true" @dblclick="resetSecrets">
          <svg class="group-hover:fill-red-400 fill-sky-400 transition duration-300 w-7 mt-[.1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Reset Connection</title><path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z" /></svg>
        </v-btn>
      </v-container>
      <v-container class="!relative flex space-x-5 items-center justify-center bg-sky-100 bg-opacity-5 rounded my-3 !w-8/12">
        <v-btn disabled class="!opacity-40 w-fit !bg-opacity-5 !shadow-none hover:shadow-lg transition duration-300 !bg-sky-200 overflow-hidden" @click="toggleTheme">
          <span>
            <!-- <transition> -->
            <svg v-if="currtheme === 'dark'" class="fill-sky-400 transition duration-300 w-7 mt-[.1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Dark Mode</title><path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13" /></svg>
            <svg v-if="currtheme !== 'dark'" class="fill-sky-400 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Light Mode</title><path d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z" /></svg>
            <!-- </transition> -->
          </span>
          <v-tooltip
            activator="parent"
            location="top"
            transition="false"
          >
            {{ `Theme: ${currtheme}` }}
          </v-tooltip>
        </v-btn>
        <v-btn disabled class="!opacity-40 w-fit !bg-opacity-5 !shadow-none hover:shadow-lg transition duration-300 !bg-sky-200 overflow-hidden" @click="toggleLang">
          <span class="text-sky-500 text-md font-bold">
            {{ currLang === 'en' ? 'En' : 'عربي' }}
          </span>
          <v-tooltip
            activator="parent"
            location="top"
            transition="false"
          >
            {{ `Language: ${currLang}` }}
          </v-tooltip>
        </v-btn>
        <!-- <v-btn disabled class="!opacity-40 w-fit !bg-opacity-5 !shadow-none hover:shadow-lg transition duration-300 !bg-sky-200 overflow-hidden" href="/">
          <span class="text-sky-500 font-bold">
            How to use
          </span>
          <v-tooltip
            activator="parent"
            location="top"
            transition="false"
          >
            {{ `Language: ${currLang}` }}
          </v-tooltip>
        </v-btn> -->
        <!-- <v-btn-toggle
          v-model="soundToggle"
        > -->
        <v-btn
          v-model="soundToggle"
          v-ripple="false"
          class="bg-transparent !shadow-none"
          @click="soundToggle = !soundToggle"
        >
          <span v-if="!soundToggle">
            <svg class="fill-emerald-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M416 432L64 80" /><path d="M224 136.92v33.8a4 4 0 0 0 1.17 2.82l24 24a4 4 0 0 0 6.83-2.82v-74.15a24.53 24.53 0 0 0-12.67-21.72a23.91 23.91 0 0 0-25.55 1.83a8.27 8.27 0 0 0-.66.51l-31.94 26.15a4 4 0 0 0-.29 5.92l17.05 17.06a4 4 0 0 0 5.37.26Zm0 238.16l-78.07-63.92a32 32 0 0 0-20.28-7.16H64v-96h50.72a4 4 0 0 0 2.82-6.83l-24-24a4 4 0 0 0-2.82-1.17H56a24 24 0 0 0-24 24v112a24 24 0 0 0 24 24h69.76l91.36 74.8a8.27 8.27 0 0 0 .66.51a23.93 23.93 0 0 0 25.85 1.69A24.49 24.49 0 0 0 256 391.45v-50.17a4 4 0 0 0-1.17-2.82l-24-24a4 4 0 0 0-6.83 2.82ZM125.82 336ZM352 256c0-24.56-5.81-47.88-17.75-71.27a16 16 0 0 0-28.5 14.54C315.34 218.06 320 236.62 320 256q0 4-.31 8.13a8 8 0 0 0 2.32 6.25l19.66 19.67a4 4 0 0 0 6.75-2A146.89 146.89 0 0 0 352 256Zm64 0c0-51.19-13.08-83.89-34.18-120.06a16 16 0 0 0-27.64 16.12C373.07 184.44 384 211.83 384 256c0 23.83-3.29 42.88-9.37 60.65a8 8 0 0 0 1.9 8.26l16.77 16.76a4 4 0 0 0 6.52-1.27C410.09 315.88 416 289.91 416 256Z" /><path d="M480 256c0-74.26-20.19-121.11-50.51-168.61a16 16 0 1 0-27 17.22C429.82 147.38 448 189.5 448 256c0 47.45-8.9 82.12-23.59 113a4 4 0 0 0 .77 4.55L443 391.39a4 4 0 0 0 6.4-1C470.88 348.22 480 307 480 256Z" /></svg>
          </span>
          <span v-if="soundToggle">
            <svg class="fill-emerald-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.553 3.064A.75.75 0 0 1 12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A1.75 1.75 0 0 1 1 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.752.752 0 0 1 .808-.13ZM10.5 5.445l-4.245 3.86a.748.748 0 0 1-.505.195h-3a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86Zm8.218-1.223a.75.75 0 0 1 1.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 0 1-1.06-1.06a9.5 9.5 0 0 0 0-13.436a.75.75 0 0 1 0-1.06Z" /><path d="M16.243 7.757a.75.75 0 1 0-1.061 1.061a4.5 4.5 0 0 1 0 6.364a.75.75 0 0 0 1.06 1.06a6 6 0 0 0 0-8.485Z" /></svg>

          </span>
        </v-btn>
        <!-- </v-btn-toggle> -->
        <div variant="plain" class="rounded-full bg-gradient-to-r from-emerald-400 to-sky-600 text-slate-800 px-3 py-1 transform -translate-x-1/2 -translate-y-1/2 !absolute !left-1/2 !top-1/12 text-xs font-bold mx-0">
          Coming Soon
        </div>
      </v-container>
      <v-card-text>
        <Connector />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-dialog.v-overlay{
  @apply !bg-gray-100 !bg-opacity-10
}
</style>
