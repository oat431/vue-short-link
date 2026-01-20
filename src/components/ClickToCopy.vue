<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    textToCopy: string;
}>();

const buttonText = ref('Copy');
const buttonTitle = ref('Click to copy to clipboard');

function copyToClipboard() {
    navigator.clipboard.writeText(props.textToCopy).then(() => {
        buttonText.value = 'Copied!';
        buttonTitle.value = 'Copied to clipboard';
        setTimeout(() => {
            buttonText.value = 'Copy';
            buttonTitle.value = 'Click to copy to clipboard';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
</script>
<template>
    <div class="flex items-center">
        <input type="text" :value="textToCopy" readonly class=" w-full mr-2" />
        <button class="btn btn-ghost" @click="copyToClipboard" :title="buttonTitle">
            {{ buttonText }}
        </button>
    </div>
</template>