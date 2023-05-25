<script setup lang="ts">
import { getSecrets, setSecrets } from '../logic/utils'
import type { SecretsType } from '../logic/types'
/* eslint no-console: */
// const panel = ref<number[]>([1, 0])
const isDisabled = ref<boolean>(false)
const isConnected = ref<boolean>(false)
const freshInstall = ref<boolean>(true)
const loading = ref<boolean>(false)
const accountKeys = ref<SecretsType>({
  subdomain: '',
  apiKey: '',
  noteModuleKey: '',
  businessName: '',
  theme: '',
})

onMounted(() => {
  const { noteModuleKey } = getSecrets()
  isConnected.value = !!noteModuleKey
})
async function submit() {
  setSecrets(accountKeys.value)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <v-expansion-panels
    :disabled="isDisabled"
    is-active="true"
    :readonly="isConnected"
    class="!w-9/12 m-auto !bg-opacity-5 mb-5"
  >
    <v-expansion-panel class="!bg-opacity-5 !bg-sky-100 !text-sky-200">
      <v-expansion-panel-title class="bg-opacity-20 !text-center">
        <div v-if="isConnected" class="w-full text-center flex items-center justify-center space-x-3">
          <span>Connect
          </span>
          <span class="m-0">
            <svg class="w-6 fill-emerald-600 rounded-full bg-emerald-600 bg-opacity-5 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Connected</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
          </span>
        </div>
        <div v-if="!isConnected" class="w-full text-center">
          Connect
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-sheet max-width="1000" class="mx-auto bg-transparent ">
          <v-form validate-on="submit lazy" @submit.prevent="submit">
            <v-text-field
              v-model="accountKeys.subdomain"
              label="Site Subdomain"
              variant="underlined"
            />
            <v-text-field
              v-model="accountKeys.apiKey"
              label="Api Key"
              variant="underlined"
            />

            <v-switch v-model="freshInstall">
              <template #label>
                First time to use?&nbsp;<span>{{ freshInstall ? "Yes" : "No" }}</span>
                <!-- <v-progress-circular
                  :indeterminate="!freshInstall"
                  size="24"
                  class="ms-2"
                /> -->
              </template>
            </v-switch>

            <v-text-field
              v-if="!freshInstall"
              v-model="accountKeys.noteModuleKey"
              label="Module Key"
              variant="underlined"
            />

            <v-btn
              :loading="loading"
              type="submit"
              variant="text"
              block
              class="mt-2"
              text="Submit"
            />
          </v-form>
        </v-sheet>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
/* .v-expansion-panel-title__overlay{
    @apply !text-center
} */
</style>
