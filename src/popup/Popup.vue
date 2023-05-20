<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
import { color, status } from '~/logic/status'

// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }
</script>

<template>
  <main class="w-[500px] px-4 py-5 text-center bg-gray-900">
    <div class="group flex items-center w-fit hover:bg-gray-100 hover:bg-opacity-10 pl-[5px] pr-4 py-[5px] font-semibold rounded transition-all duration-300 cursor-pointer dark:bg-blue-200 text-gray-400 mb-4">
      <a href="https://google.com" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 14.5l-3-3l3-3m-3 3h11" /><path d="M16.5 9.5V5.495a1 1 0 0 0-.883-.993l-.12-.007L13.5 4.5m-6 0l-1.998-.005a1 1 0 0 0-.995.881l-.007.12v10.997a1 1 0 0 0 1 1l10 .006a1 1 0 0 0 .994-.882l.006-.117V14" /><path d="M8.5 3.5h4a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2z" /></g></svg>
      </a>
      <span class="font-normal group-hover:opacity-100 opacity-0 transition-all duration-300 group-hover:translate-x-1 transform -translate-x-2 ">
        Visit the website
      </span>
    </div>
    <!-- <div>Popup</div>
    <SharedSubtitle />
    <input type="bg-black" placeholder="jgaorsijg">
    <div class="2-2">
      <button class="btn mt-2" @click="openOptionsPage">
        Options
      </button>
      <button class="btn mt-2 text-3xl" @click="drawer = !drawer">
        Drawer {{ drawer }}
      </button>
    </div> -->

    <h1 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl dark:text-white">
      Daftra Notes
      <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Free</span>
    </h1>
    <p class="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
      A Daftra extension would allow users to take notes on individual pages in Daftra. The notes could be taken in a variety of formats and organized by page, document, or project. The extension would be easy to use and would not disrupt the user's workflow.
    </p>
    <Login />

    <!-- <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
      Learn more
      <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
    </a> -->

    <div class="flex items-center justify-center space-x-5 mt-2 text-gray-300">
      <div class="">
        <span class="opacity-50">
          Storage:
        </span>
        <span class="opacity-100">
          {{ storageDemo }}
        </span>
      </div>
      <div class="">
        <span class="opacity-50">
          Status:
        </span>
        <span :class="color">
          {{ status }}
        </span>
      </div>
    </div>
  </main>
  <!-- <ElDrawer
    v-model="drawer"
    title="I am the title"
    direction="rtl"
  >
    <span>Hi, there!</span>
  </ElDrawer> -->
</template>
