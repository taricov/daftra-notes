<script setup lang="ts">
import { ref } from 'vue'
// import { useToggle } from '@vueuse/core'
import 'uno.css'
const drawer = ref(true)
// const [show, toggle] = useToggle(false)
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="drawer ? 'opacity-100' : 'opacity-0'"
    >
      <!--   <h1 class="text-lg">
        Vit
      </h1>
      <SharedSubtitle /> -->

      <!-- <el-drawer
      v-model="drawer"
      title="I am the title"
      direction="rtl"
    >
      <span>Hi, there!</span>
    </el-drawer> -->
      <Compp />
    </div>

    <div
      class="flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg="teal-600 hover:teal-700"
      @click="drawer = !drawer"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </div>
  </div>
</template>
