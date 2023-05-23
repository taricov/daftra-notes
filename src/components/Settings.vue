<script setup lang="ts">
defineProps({ openSettings: Boolean })
const connected = ref<boolean>(false)
// const opened = ref<boolean>(false)
// console.log('fdsfdddddd')
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
        <p variant="tonal" class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 px-0 mb-4 text-xl font-extrabold  dark:text-white"> Free and Open Source Tool </p>
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
