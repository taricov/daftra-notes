<script setup lang="ts">
import { SetSecretsCookie } from '../logic/utils'
/* eslint no-console: */
// const panel = ref<number[]>([1, 0])
const isDisabled = ref<boolean>(false)
const freshInstall = ref<boolean>(true)
const loading = ref<boolean>(false)
const accountKeys = ref<{
  subdomain: any
  apiKey: any
  noteModule: any
  businessName: String
}>({
  subdomain: '',
  apiKey: '',
  noteModule: '',
  businessName: '',
})
async function submit() {
  SetSecretsCookie(accountKeys.value.subdomain, accountKeys.value.apiKey, accountKeys.value.noteModule)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <v-expansion-panels
    :disabled="isDisabled"
    class="!w-9/12 m-auto !bg-opacity-5 mb-5"
  >
    <v-expansion-panel class="!bg-opacity-5 !bg-sky-100 !text-sky-200">
      <v-expansion-panel-title class="bg-opacity-20 !text-center">
        <div class="w-full text-center">
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
              v-model="accountKeys.noteModule"
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
