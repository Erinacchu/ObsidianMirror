<script setup lang="ts">
import Item from "@/components/SubdirMenu.vue";
const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <Suspense>
    <main>
      <Item :id="props.id" />
    </main>
  </Suspense>
</template>
