<script setup lang="ts">
import { ref, computed, reactive, nextTick, onMounted } from "vue";
import fs from "vite-plugin-fs/browser";
import Markdown from "vue3-markdown-it";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItTasklists from "markdown-it-task-lists";
import MarkdownItTOC from "markdown-it-toc-done-right";
import Item from "./Item.vue";

const props = defineProps<{
  dir: string;
  file: string;
}>();

const file = await fs.readFile(
  decodeURIComponent(`src/obsidian/${props.dir}/${props.file}`, "UTF-8")
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
