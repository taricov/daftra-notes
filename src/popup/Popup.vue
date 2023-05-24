<script setup lang="ts">
import { color, status } from '~/logic/status'

const openOptionsPage = () => {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[500px] px-4 py-5 text-center bg-gray-900">
    <div class="group flex items-center w-fit hover:bg-gray-100 hover:bg-opacity-10 pl-[5px] pr-4 py-[5px] font-semibold rounded transition-all duration-300 cursor-pointer dark:bg-blue-200 text-gray-400 mb-1">
      <a href="https://google.com" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 14.5l-3-3l3-3m-3 3h11" /><path d="M16.5 9.5V5.495a1 1 0 0 0-.883-.993l-.12-.007L13.5 4.5m-6 0l-1.998-.005a1 1 0 0 0-.995.881l-.007.12v10.997a1 1 0 0 0 1 1l10 .006a1 1 0 0 0 .994-.882l.006-.117V14" /><path d="M8.5 3.5h4a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2z" /></g></svg>
      </a>
      <span class="font-normal group-hover:opacity-100 opacity-0 transition-all duration-300 group-hover:translate-x-1 transform -translate-x-2 ">
        Visit the website
      </span>
    </div>
    <p class="btn transition duration-300 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-sky-700">
      Stay organized
    </p>
    <h1 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl dark:text-white">
      D-Notes
      <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Free</span>
    </h1>

    <p class="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-300">
      D-Notes is a business utility app for taking notes per page in Daftra ERP. All notes are stored securely and can be accessed from the
      <button class="underline transition-all duration-200 hover:text-sky-300" @click="openOptionsPage">
        Dashboard
      </button>
      so you would never miss what's next.
    </p>

    <div class="flex items-center justify-center space-x-5 mt-2 text-gray-300">
      <div class="">
        <span class="opacity-50">
          Storage:
        </span>
        <span class="opacity-100" />
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
    <button class="btn my-2 text-xs transition duration-150 group" @click="openOptionsPage">
      Developed by Taric Ov <span class="group-hover:translate-x-1 transform transition duration-300 inline-block">→</span>
    </button>
    <p class="text-xs font-normal my-0 text-gray-300 opacity-80 hover:opacity-100 transition duration-150">
      This tool is part of the large business toolkit
      <a class="underline transition-all duration-200 hover:text-sky-300" href="https://dsuite.com/dnotes">
        D-Suite</a>
      that aims to improve the digital experience for businesses in MENA.
    </p>
  </main>
</template>
