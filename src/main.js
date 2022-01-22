import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCJdU7Q9J3U1Ger63PApwgtEZRv-KxyoOU",
    libraries: "places",
  },
});

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
