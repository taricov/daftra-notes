<script setup lang="ts">
import { ref } from 'vue'
import { storageDemo } from '~/logic/storage'
import 'vuetify/styles'

const color = ref('rgba(19, 206, 102, 0.8)')
</script>

<template>
  <v-app>
    <div>
      <el-color-picker v-model="color" show-alpha />
    </div>
    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <img src="/assets/icon.svg" class="icon-btn mx-2 text-2xl" alt="extension icon">
      <div>Options</div>
      <SharedSubtitle />
      <Compp />

      <input v-model="storageDemo" class="border border-gray-400 rounded px-2 py-1 mt-2">
    </main>
  </v-app>
</template>
