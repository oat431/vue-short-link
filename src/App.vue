<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import ClickToCopy from './components/ClickToCopy.vue';
import { getAllShortLinks, createShortLink, confirmAction } from './service/ShortLink';
import type { ShortLinkList } from './types/ShortLinkList';
import type { ShortLinkRequest } from './types/ShortLinkRequest';

const isCheck = ref(false);
const shortLinkList = ref<Array<ShortLinkList>>([]);
const longUrl = ref('');
const urlAlias = ref('');

async function createShortUrl() {
  let password = prompt("Enter admin password to create custom short URL:");
  let isConfirmed = await confirmAction(password ? password : "");
  if (isConfirmed) {
    let urlType = isCheck.value ? "CUSTOM" : "RANDOM";
    let shortUrlRequest: ShortLinkRequest = {
      type: urlType,
      originalLink: longUrl.value,
      customAlias: isCheck.value ? urlAlias.value : ''
    }
    await createShortLink(shortUrlRequest);
    alert("Short URL created successfully!");
    shortLinkList.value = await getAllShortLinks();
  } else {
    alert("Action cancelled or incorrect password.");
  }
}

onMounted(() => {
  getAllShortLinks().then(data => {
    shortLinkList.value = data;
    console.log(shortLinkList.value);
  }).catch(error => {
    console.error("Error fetching short links:", error);
  });
});

</script>
<template>
  <NavBar />
  <div class="lg:mx-60 lg:my-6 lg:px-3 sm:mx-10 sm:my-2 sm:px-1">
    <div class="overflow-x-auto">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Your Very Long URL goes here</legend>
        <input type="text" class="input w-full" placeholder="Type here" v-model="longUrl" />
        <label class="label">
          <input type="checkbox" class="toggle" v-model="isCheck" />
          <span class="label-text ml-2">Enable Custom Short URL</span>
        </label>
        <div v-if="isCheck" class="mt-4">
          <input type="text" class="input w-full" placeholder="Enter Custom Short URL" v-model="urlAlias" />
        </div>
        <button class="btn btn-primary mt-4" v-on:click="createShortUrl()">Process</button>
      </fieldset>
    </div>
  </div>
  <div class="lg:mx-60 lg:my-6 lg:px-3 sm:mx-10 sm:my-2 sm:px-1">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Short Link</th>
            <th>Original Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in shortLinkList" :key="link.shortLink">
            <td>
              <ClickToCopy :textToCopy="link.shortLink" />
            </td>
            <td>
              <ClickToCopy :textToCopy="link.originalLink" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Footer />
</template>