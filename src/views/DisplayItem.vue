<script setup lang="ts">
import Anzeige from "@/components/Anzeige.vue";

import Item from "@/components/Item.vue";
const props = defineProps<{
  dir: string;
  file: string;
}>();

const filetype = props.file.split(".")[1];
console.log(filetype);
</script>
<template>
  <Suspense>
    <div class="page">
      <div v-if="filetype === 'md'">
        <Anzeige :dir="props.dir" :file="props.file" />
      </div>
      <div v-else>File can not be read</div>
    </div>
  </Suspense>
</template>
