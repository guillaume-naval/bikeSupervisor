<template>
  <v-navigation-drawer
    hide-overlay
    v-model="drawerOpen"
    absolute
    right
    width="40%"
  >
    <form v-if="currentBike" class="pa-5">
      <h3 class="font-weight-medium mb-10">Vélo à modifier</h3>
      <v-text-field
        v-model="currentBike.location.coordinates[0]"
        label="Lng"
        required
        :disabled="!isEditing"
        :class="{ view: !isEditing }"
      ></v-text-field>
      <v-text-field
        v-model="currentBike.location.coordinates[1]"
        label="Lat"
        required
        :disabled="!isEditing"
        :class="{ view: !isEditing }"
      ></v-text-field>
      <v-text-field
        v-model="currentBike.serial_number"
        :disabled="!isEditing"
        :class="{ view: !isEditing }"
        label="Numéro de Série"
        required
      ></v-text-field>
      <v-select
        hint="1 = Libre, 2 = Réservé, 3 = En utilisation"
        persistent-hint
        v-model="currentBike.service_status"
        :items="items"
        label="État"
        required
        :disabled="!isEditing"
      ></v-select>
      <v-subheader class="ma-0 pa-0">Batterie</v-subheader>
      <v-slider
        :disabled="!isEditing"
        v-model="currentBike.battery_level"
        thumb-color="blue"
        thumb-label="always"
        thumb-size="24"
      ></v-slider>

      <v-btn
        class="mr-4 mt-5"
        color="warning"
        @click="isEditing = !isEditing"
        v-if="!isEditing"
      >
        Modifier
      </v-btn>
      <v-btn
        color="success"
        class="mr-4 mt-5"
        @click="save(currentBike.id)"
        v-else-if="isEditing"
      >
        Enregistrer
      </v-btn>
      <v-btn color="error" class="mr-4 mt-5" v-if="isEditing" @click="cancel"
        >Annuler</v-btn
      >
    </form>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "RightDrawer",
  props: {
    currentBike: {},
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      drawerOpen: this.open,
      isEditing: false,
      items: [1, 2, 3],
    };
  },
  methods: {
    async save(id) {
      try {
        console.log(JSON.stringify(this.currentBike));
        console.log(this.currentBike.service_status);
        console.log(id);
        let res = await fetch(
          `https://61c331d69cfb8f0017a3ea05.mockapi.io/bikes/` + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.currentBike),
          }
        );
        this.data = res;
        console.log(res);
        alert("Le vélo n°" + this.currentBike.serial_number + " a été modifié");
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      this.drawerOpen = false;
    },
  },
  watch: {
    open(newVal) {
      this.drawerOpen = newVal;
    },
  },
};
</script>
<style scoped>
.rightDrawer {
  width: 50%;
}
</style>