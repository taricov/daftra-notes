<script setup>
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  /* eslint no-console: */
  console.log('Handle the response', response)
}
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
