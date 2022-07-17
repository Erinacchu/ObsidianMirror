<template>
  <div
    v-on:mouseover="mouseover"
    v-on:mouseleave="mouseleave"
    id="sidebar"
    class="sidebar"
  >
    <div class="logo">
      <!--  <img src="https://bun.sh/logo.svg" /> -->
    </div>
    <div class="itemul" style="height: 85%">
      <ul v-for="item in list">
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

function changeTheme(event) {
  var body = document.getElementsByTagName("body")[0];
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("white");
  } else {
    body.classList.add("dark");
    body.classList.remove("white");
  }

  var sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("darksidebar")) {
    sidebar.classList.remove("darksidebar");
    sidebar.classList.add("whitesidebar");
  } else {
    sidebar.classList.add("darksidebar");
    sidebar.classList.remove("whitesidebar");
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
const list = dir.map((item) => item);

const mouseover = (event) => {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = "200px";
};
const mouseleave = (event) => {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = "200px";
};
</script>
