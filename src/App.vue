<script setup lang="ts">
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';

const isCheck = ref(false);

function createShortUrl() {
  let password = prompt("Enter admin password to create custom short URL:");
  if (password === "admin123") {
    alert("Custom short URL created successfully!");
  } else {
    alert("Incorrect password. Cannot create custom short URL.");
  }
}

</script>
<template>
  <NavBar />
  <div class="lg:mx-60 lg:my-6 lg:px-3 sm:mx-10 sm:my-2 sm:px-1">
    <div class="overflow-x-auto">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Your Very Long URL goes here</legend>
        <input type="text" class="input w-full" placeholder="Type here" />
        <label class="label">
          <input type="checkbox" class="toggle" v-model="isCheck" />
          <span class="label-text ml-2">Enable Custom Short URL</span>
        </label>
        <div v-if="isCheck" class="mt-4">
          <input type="text" class="input w-full" placeholder="Enter Custom Short URL" />
        </div>
        <button class="btn btn-primary mt-4" v-on:click="createShortUrl()">Process</button>
      </fieldset>
    </div>
  </div>
</template>