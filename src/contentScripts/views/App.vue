<script setup lang="ts">
import { ref } from 'vue'
import 'uno.css'
const drawer = ref<boolean>(true)
const toggleDrawer = (): void => {
  /* eslint no-console: */
  drawer.value = !drawer.value
  console.log('drawer btn clicked: ', drawer.value)
}
</script>

<template>
  <VDrawer :drawer="drawer" />
  <div
    class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em flex w-10 h-10 rounded-full shadow cursor-pointer bg-red-500 hover:bg-red-700 transition-all duration-300"
    @click="toggleDrawer"
  >
    <!--    <div
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="drawer ? 'opacity-100' : 'opacity-0'"
    >
       <h1 class="text-lg">
        Vit
      </h1>
      <SharedSubtitle />
    </div> -->

    <!-- <div
      class=""
    >
    </div> -->
    <!-- <pixelarticons-power class="block m-auto text-white text-lg" /> -->
  </div>
</template>
