<template>
  <keep-alive :max="20">
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: "RouterViews"
};
</script>