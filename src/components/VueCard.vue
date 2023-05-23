<script setup lang="ts">
defineProps({
  path: String,
  author: String,
  body: String,
  date: String,
})
</script>

<template>
  <v-card

    variant="tonal"
    class="!bg-slate-900 !text-slate-300 !transition-all duration-300 shadow-lg hover:-translate-y-1 transform"
  >
    <v-card-actions>
      <v-btn size="small" color="" variant="">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
      </v-btn>
      <v-btn size="small" color="" variant="">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
      </v-btn>

      <!-- <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark" /> -->
    </v-card-actions>

    <p class="text-lg font-semibold">
      {{ author }}
    </p>
    <p class="italic hover:opacity-100 opacity-50 transition duration-300">
      {{ path }}
    </p>
    <v-chip class="text-md my-2 ">
      {{ date }}
    </v-chip>
    <p class="text-md px-3 py-2">
      {{ body }}
    </p>

    <v-card-actions>
      <v-btn :href="path" class="!transition-all !duration-500 !bg-slate-100 !bg-opacity-5 hover:!bg-gradient-to-r hover:!to-emerald-900 hover:!from-sky-700 hover:bg-opacity-50">
        Go to page
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- <v-card
    class="mx-auto"
    width="400"
    prepend-icon="mdi-home"
  >
    <div>
      {{ date }}
    </div>
    <div>
      {{ author }}
    </div>
    <v-card-text>
      {{ body }}
    </v-card-text>
    <v-button href="path">
      {{ path?.split("/").slice(-1)[0].replace("-", " ") }}
    </v-button>
  </v-card> -->
</template>
