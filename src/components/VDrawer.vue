<script lang="ts" setup>
defineProps({ drawer: Boolean })
/* eslint no-console: */
// console.log(props.drawer)
</script>

<template>
  <!-- <el-drawer :drawer="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </el-drawer> -->
  <v-navigation-drawer
    :drawer="drawer"
    location="right"
    temporary
  >
    <p>hello</p>
  </v-navigation-drawer>
</template>
