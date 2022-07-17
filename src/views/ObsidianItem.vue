<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import Item from "@/components/Item.vue";
const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <Suspense>
    <main>
      <Item :id="id" />
    </main>
  </Suspense>
</template>
