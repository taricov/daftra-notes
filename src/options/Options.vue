<script setup lang="ts">
import 'vuetify/styles'
import notes from '../fakedata'
</script>

<template>
  <v-app class="!bg-gray-900">
    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <h1 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl dark:text-white">
        Notes Dashboard
        <!-- <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Free</span> -->
      </h1>
      <p class="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
        Use filters to find notes in a much efficient way
      </p>

      <!-- <img src="/assets/icon.svg" class="icon-btn mx-2 text-2xl" alt="extension icon">
      <div>Options</div> -->

      <!-- <input v-model="storageDemo" class="border border-gray-400 rounded px-2 py-1 mt-2"> -->
      <v-container class="!bg-slate-100 !bg-opacity-2">
        <v-row no-gutters>
          <v-col
            v-for="note in notes"
            :key="note.id"
            cols="12"
            sm="4"
          >
            <VueCard class="m-2" :body="note.body" :author="note.author" :date="note.date" :path="note.path" />
          </v-col>
        </v-row>
      </v-container>
    </main>
  </v-app>
</template>
