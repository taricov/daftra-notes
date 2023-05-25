<script setup lang="ts">
import 'vuetify/styles'
import notes from '../fakedata'
import { getSecrets } from '~/logic/utils'

const allTags = ref<String[]>(['work', 'invoice', 'inquiry', 'new hire'])
const allColors = ref<String[]>(['red', 'green', 'yellow', 'blue'])
const selectedColors = ref<String[]>([])
const allPeriods = ref<String[]>(['Last Hour', 'Yesterday', 'Last 5 days', 'Last Week', 'Last 30 days'])
const allRoutes = ref<String[]>(['/work-order', '/dashboard', '/invoices', '/invoices/23'])
const selectedRoutes = ref<String[]>([])
const dateFrom = ref()
const dateTo = ref()

const filteredRez = () => {
  return Math.floor(Math.random() * 100)
}

const openSettings = ref<boolean>(false)
function openSettingsFn() {
  openSettings.value = !openSettings.value
}

const businessNameKnown = ref<string | null>(null)
const currtheme = ref<string | null>(null)
const currLang = ref<string>('en')

onMounted(() => {
  const { subdomain, businessName, apiKey, noteModuleKey, theme } = getSecrets()

  // eslint-disable-next-line no-console
  console.log('from popup: ', subdomain, businessName, apiKey, noteModuleKey, theme)

  businessNameKnown.value = businessName || 'Notes'
  currtheme.value = theme || 'dark'
  currLang.value = theme || 'en'
})
</script>

<template>
  <Settings v-model="openSettings" />

  <v-app class="!bg-gray-900">
    <v-btn class="absolute py-1 top-5 left-5 w-fit !bg-opacity-5 !shadow-none hover:shadow-lg transition duration-300 !bg-sky-200" @click="openSettingsFn">
      <svg class="fill-sky-400 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 w-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    </v-btn>

    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <h1 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl dark:text-white">
        {{ businessNameKnown }} Dashboard
        <!-- <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Free</span> -->
      </h1>
      <!-- protip -->
      <!-- <p class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
        Pro tip: Use <span class="rounded px-1 py-1 bg-gradient-to-r to-emerald-600 from-sky-400 text-black text-md"> Ctrl + K </span>&nbsp;the D-MagicBar and access your notes on-the-fly
      </p> -->
      <p class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
        Pro tip: Use filters or search by date/page/word for quick access
      </p>

      <v-container disabled class="relative flex-col space-x-5 items-center justify-center bg-sky-100 bg-opacity-5 rounded my-3">
        <div>
          <!-- predefined date periods filter -->
          <v-select
            label="Periods"
            :items="allPeriods"
          />
          <!-- from to filter -->
          <Datepicker v-model="dateFrom" />
          <Datepicker v-model="dateTo" />

          <!-- routes filter -->

          <v-switch
            v-for="route in allRoutes"
            :key="route"
            v-model="selectedRoutes"
            :label="route"
            color="success"
            :value="route"
            hide-details
          />
          <!-- color/colorful statuses filter -->
          <v-sheet>
            <v-checkbox
              v-for="c in allColors"
              :key="c"
              v-model="selectedColors"
              :label="c"
            />
          </v-sheet>
          <!-- tags filter -->
          <v-select
            chips
            label="Select"
            :items="allTags"
          />
          <!-- search bar -->
          <v-text-field
            label="Search Barr"
            hide-details="auto"
          />
          <!-- action btns -->
        </div>
        <v-sheet>
          <v-btn>Show {{ filteredRez.length || 9 }} Results</v-btn>
          <v-btn>Reset</v-btn>
        </v-sheet>

        <div variant="plain" class="rounded-full bg-gradient-to-r from-emerald-400 to-sky-600 text-slate-800 px-3 py-1 transform -translate-x-1/2 -translate-y-1/2 !absolute !left-1/2 !top-0 text-xs font-bold  ">
          Coming Soon
        </div>
      </v-container>

      <v-container v-if="businessNameKnown" class="!bg-slate-100 !bg-opacity-2">
        <div class="opacity-30 mt-4 transition duration-300">
          {{ `3/${notes.length}` }}
        </div>
        <v-row no-gutters>
          <v-col
            v-for="note in notes"
            :key="note.id"
            cols="12"
            sm="4"
          >
            <VueCard class="m-2" :num="+note.id" :body="note.body" :author="note.author" :date="note.date" :path="note.path" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="!businessNameKnown" class="mt-30 space-y-5">
        <h2 class="text-3xl font-bold">
          1. Click ⛭ <br>
          2. Connect...
        </h2>
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="m-auto w-10 opacity-20 fill-sky-100" viewBox="0 0 24 24"><title>database-off</title><path d="M19.07 15.87C19.66 15.31 20 14.68 20 14V16.8L19.07 15.87M20 9C20 10.54 18.27 11.86 15.73 12.53L17.89 14.69C19.19 14 20 13.04 20 12V9M20 7C20 4.79 16.42 3 12 3C10.13 3 8.42 3.33 7.06 3.86L14.06 10.86C17.5 10.41 20 8.85 20 7M2.39 1.73L1.11 3L4.21 6.1C4.08 6.39 4 6.69 4 7C4 8.63 5.96 10.04 8.77 10.66L11.08 12.97C7.1 12.74 4 11.06 4 9V12C4 14.21 7.58 16 12 16C12.69 16 13.35 15.95 14 15.87L15.66 17.55C14.57 17.84 13.32 18 12 18C7.58 18 4 16.21 4 14V17C4 19.21 7.58 21 12 21C14.31 21 16.38 20.5 17.84 19.73L20.84 22.73L22.11 21.46L2.39 1.73Z" /></svg>
        </div>
        <div>
          Not Connected!
        </div>
      </v-container>
    </main>
  </v-app>
</template>
