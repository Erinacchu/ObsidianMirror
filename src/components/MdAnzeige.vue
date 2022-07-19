<script setup lang="ts">
import fs from "vite-plugin-fs/browser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Markdown from "vue3-markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItTOC from "markdown-it-toc-done-right";
import Item from "./SubdirMenu.vue";

const props = defineProps<{
  dir: string;
  file: string;
}>();

const file = await fs.readFile(
  decodeURIComponent(`src/obsidian/${props.dir}/${props.file}`)
);

const plugins = [
  {
    plugin: MarkdownItAnchor,
  },
  {
    plugin: MarkdownItTOC,
  },
  {
    plugin: MarkdownItHighlightjs,
  },
];
</script>
<template>
  <Item :id="dir" />

  <Markdown
    :source="file"
    :breaks="true"
    :html="true"
    :linkify="true"
    :plugins="plugins"
  />
</template>
