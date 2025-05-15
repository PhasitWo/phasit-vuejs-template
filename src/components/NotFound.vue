<template>
  <div class="not-found-container" data-testid="not-found">
    <h1>404</h1>
    <h2>Page not found!</h2>
    <router-link :to="'/'">Go back to homepage</router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
