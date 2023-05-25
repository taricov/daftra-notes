<script setup lang="ts">
import 'vuetify/styles'
import notes from '../fakedata'
const openSettings = ref<boolean>(false)
function openSettingsFn() {
  openSettings.value = !openSettings.value
}
</script>

<template>
  <Settings v-model="openSettings" />

  <v-app class="!bg-gray-900">
    <v-btn class="absolute py-1 top-5 left-5 w-fit !bg-opacity-5 !shadow-none hover:shadow-lg transition duration-300 !bg-sky-200" @click="openSettingsFn">
      <svg class="fill-sky-400 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 w-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    </v-btn>

    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <h1 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl dark:text-white">
        Notes Dashboard
        <!-- <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Free</span> -->
      </h1>
      <!-- protip -->
      <!-- <p class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
        Pro tip: Use <span class="rounded px-1 py-1 bg-gradient-to-r to-emerald-600 from-sky-400 text-black text-md"> Ctrl + K </span>&nbsp;the D-MagicBar and access your notes on-the-fly
      </p> -->
      <p class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
        Pro tip: Use filters or search by date/page/word for quick access
      </p>
      <v-container class="!bg-slate-100 !bg-opacity-2">
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
    </main>
  </v-app>
</template>
