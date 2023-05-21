<script lang="ts" setup>
const props = defineProps({ drawer: Boolean })
/* eslint no-console: */
console.log(props.drawer)
</script>

<template>
  <el-drawer :drawer="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </el-drawer>
</template>
