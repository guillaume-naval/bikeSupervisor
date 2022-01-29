<template>
  <v-app>
    <div class="main-content d-flex ma-0 pa-0">
      <div class="left-side">
        <div class="intro-text pa-10">
          <img src="./assets/logo.png" alt="logo ZS" class="logo mb-5" />

          <h2 class="mb-3">Bienvenue ! <v-icon>mdi-bike</v-icon></h2>

          <p>
            Zoov supervisor permet d'observer les vélos en service dans
            <span class="font-weight-bold">tous leurs états </span>!
          </p>
          <p>Vous pouvez voir plus de détails sur le projet sur le lien :</p>
          <a href="https://github.com/pulilab/vue-people" target="_blank"
            >https://github.com/pulilab/vue-people
          </a>
        </div>
      </div>
      <AddMap />
    </div>
  </v-app>
</template>

<script>
import AddMap from "./components/AddMap";

export default {
  name: "App",

  components: {
    AddMap,
  },

  data() {
    return {};
  },
};
</script>

<style>
.logo {
  width: 220px;
}
.left-side {
  max-width: 300px;
  z-index: 2;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.151);
}
.main-content {
  height: 100%;
}
</style>