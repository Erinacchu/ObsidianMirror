<template>
  <div
    id="sidebar"
    class="sidebar"
  >
    <div class="logo">
      <!--  <img src="https://bun.sh/logo.svg" /> -->
    </div>
    <div class="itemul" style="height: 85%">
      <ul v-for="item in list" :key="item">
        <li>
          <a :href="'/dir/' + item">{{ item }}</a>
        </li>
      </ul>
    </div>
    <div class="footer">
      <center><button @click="changeTheme">switch theme</button></center>
    </div>
  </div>
  <div class="page">
    <Markdown
      :source="file2"
      :breaks="true"
      :html="true"
      :linkify="true"
      :plugins="plugins"
    />
  </div>
</template>

<script setup lang="ts">
import fs from "vite-plugin-fs/browser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Markdown from 'vue3-markdown-it';
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItTOC from "markdown-it-toc-done-right";

function changeTheme() {
  const body = document.getElementsByTagName("body")[0];
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("white");
  } else {
    body.classList.add("dark");
    body.classList.remove("white");
  }

  const sidebar = document.getElementById("sidebar");
  if (sidebar?.classList.contains("darksidebar")) {
    sidebar?.classList.remove("darksidebar");
    sidebar?.classList.add("whitesidebar");
  } else {
    sidebar?.classList.add("darksidebar");
    sidebar?.classList.remove("whitesidebar");
  }
}

const file2 = await fs.readFile("README.md");
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
const dir = await fs.readdir("/src/obsidian");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const list = dir.map((item) => item);
</script>
