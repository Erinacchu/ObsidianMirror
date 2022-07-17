import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Markdown from "vue3-markdown-it";
import VueHighlightJS from "vue3-highlightjs";

const app = createApp(App);

app.use(router);
app.use(Markdown);
app.use(VueHighlightJS);
app.mount("#app");
