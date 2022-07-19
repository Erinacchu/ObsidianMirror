import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Markdown from "vue3-markdown-it";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueHighlightJS from "vue3-highlightjs";

const app = createApp(App);

app.use(router);
app.use(Markdown);
app.use(VueHighlightJS);
app.mount("#app");
