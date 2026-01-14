<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { healthCheck } from '../service/ShortLink';
const serverStatus = ref<string>('Unknown');

onMounted(() => {
    healthCheck().then(data => {
        serverStatus.value = data.status; // Assuming the health check response has a 'status' field
    }).catch(error => {
        serverStatus.value = error;
    });
});
</script>
<template>
    <div class="navbar bg-base-300 shadow-sm">
        <a class="btn btn-ghost text-xl">Panomete Short Link</a>
        <div class="ml-auto mr-4">
            <span class="badge badge-lg badge-info">API Status: {{ serverStatus }}</span>
        </div>
    </div>
</template>