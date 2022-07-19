<script setup lang="ts">
import fs from "vite-plugin-fs/browser";
const props = defineProps<{
  id: string;
}>();

const diro = await fs.readdir(`/src/obsidian/${props.id}`);
//const list = diro.map((item) => item.substring(0, 16));
//filter list by filetype

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const list = diro.filter((item) => item.endsWith(".md"));


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
</script>

<template>
  <div
    id="sidebar"
    class="sidebar"
  >
    <div class="logo">
      <!--<img src="https://bun.sh/logo.svg" /> -->
    </div>
    <div class="itemul" style="height: 85%">
      <ul>
        <li>
          <u
            ><a href="/">../{{ props.id }}</a></u
          >
        </li>
      </ul>
      <ul v-for="item in list" :key="item">
        <li>
          <a :href="`/dir/` + id + `/` + item">{{ item }}</a>
        </li>
      </ul>
    </div>
    <div class="footer">
      <center><button @click="changeTheme">switch theme</button></center>
    </div>
  </div>
</template>
