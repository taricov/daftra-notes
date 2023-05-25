<script setup lang="ts">
import { getSecrets } from '~/logic/utils'

defineProps({ openSettings: Boolean })
const connected = ref<boolean>(false)

const businessNameKnown = ref<string | null>(null)
const currtheme = ref<string | null>(null)
const currLang = ref<string>('en')

onMounted(() => {
  const { subdomain, businessName, apiKey, noteModuleKey, theme } = getSecrets()
  // eslint-disable-next-line no-console
  console.log(businessName)
  // eslint-disable-next-line no-console
  console.log('from popup: ', subdomain, businessName, apiKey, noteModuleKey, theme)

  businessNameKnown.value = businessName || 'Notes'
  currtheme.value = theme || 'dark'
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
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="50%"
    :is-active="openSettings"
    class=""
  >
    <v-card class="!bg-gray-900 shadow-lg">
      <v-container>
        <h3 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-xl font-extrabold md:text-xl lg:text-3xl dark:text-white">
          Settings
        </h3>
        <p variant="tonal" class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 px-0 mb-4 text-xl font-extrabold  dark:text-white">
          Connet your Daftra
          <!-- and cusomize the look to your likings -->
        </p>
      </v-container>
      <v-container class="flex space-x-5 items-center justify-center bg-sky-100 bg-opacity-5 rounded my-3 !w-8/12">
        <!-- langSwitch -->
        <!-- How To use -->
        <v-btn class="!bg-opacity-5 overflow-hidden" @click="toggleTheme">
          <span>
            <!-- <transition> -->
            <svg v-if="currtheme === 'dark'" class="transition duration-300 w-8 mt-[.1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>white-balance-sunny</title><path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13" /></svg>
            <svg class="w-8" else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>moon-waning-crescent</title><path d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z" /></svg>
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
        <v-btn class="!bg-opacity-5 overflow-hidden" @click="toggleLang">
          <span>
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
      </v-container>
      <v-card-text>
        <Connector v-if="!connected" />
      </v-card-text>
      <!-- <v-card-actions class="justify-end">
        <v-btn
          variant="text"
          @click="isActive.value = false"
        >
          Close
        </v-btn>
      </v-card-actions> -->
    </v-card>
    <!-- </template> -->
  </v-dialog>
</template>

<style scoped>
.v-overlay{
  /* @apply !bg-gray-100  */
}
</style>
