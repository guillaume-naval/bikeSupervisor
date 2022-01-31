<template>
  <v-navigation-drawer
    hide-overlay
    v-model="drawerOpen"
    absolute
    right
    width="45%"
  >
    <v-form v-if="currentBike" class="pa-5" ref="form">
      <h3 class="font-weight-medium mb-10">Vélo à modifier</h3>
      <v-text-field
        v-model="longitude"
        label="Longitude"
        required
        :disabled="!isEditing"
        :class="{ view: !isEditing }"
        :rules="longitudeRules"
      ></v-text-field>
      <v-text-field
        v-model="latitude"
        label="Latitude"
        required
        :disabled="!isEditing"
        :class="{ view: !isEditing }"
        :rules="latitudeRules"
      ></v-text-field>
      <v-text-field
        v-model="serial_number"
        :disabled="!isEditing"
        :class="{ view: !isEditing }"
        label="Numéro de Série"
        required
        :rules="serialRules"
      ></v-text-field>
      <v-select
        hint="1 = Libre, 2 = Réservé, 3 = En utilisation"
        persistent-hint
        v-model="service_status"
        :items="items"
        label="État"
        required
        :disabled="!isEditing"
      ></v-select>
      <v-subheader class="ma-0 pa-0">Batterie</v-subheader>
      <v-slider
        :disabled="!isEditing"
        v-model="battery_level"
        thumb-color="blue"
        thumb-label="always"
        thumb-size="24"
      ></v-slider>

      <v-btn
        class="mr-4 mt-5"
        color="warning"
        @click="
          isEditing = !isEditing;
          initFormValues();
        "
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
      <v-btn color="error" class="mr-4 mt-5" @click="close()">Fermer</v-btn>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "RightDrawer",
  props: {
    currentBike: Object,
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      valid: true,
      longitude: null,
      latitude: null,
      serial_number: null,
      service_status: null,
      battery_level: null,
      drawerOpen: this.open,
      isEditing: false,
      items: [1, 2, 3],
      allowSpaces: false,
      min: 4,
    };
  },
  computed: {
    latitudeRules() {
      const rules = [];
      var ck_lat = /^-?([1-8]?\d(?:\.\d{1,})?|90(?:\.0{1,6})?)$/;
      const rule = (v) =>
        ck_lat.test(v || "") ||
        "La latitude n'est pas valide. Elle doit être située entre -90 et 90";
      rules.push(rule);
      return rules;
    },
    longitudeRules() {
      const rules = [];
      var ck_lng = /^-?((?:1[0-7]|[1-9])?\d(?:\.\d{1,})?|180(?:\.0{1,})?)$/;
      const rule = (v) =>
        ck_lng.test(v || "") ||
        "La longitude n'est pas valide. Elle doit être située entre -180 et 180";
      rules.push(rule);
      return rules;
    },
    serialRules() {
      const rules = [];

      if (this.min) {
        const rule = (v) =>
          (v || "").length >= this.min ||
          `Entrer un minimium de ${this.min} caractères`;

        rules.push(rule);
      }

      if (!this.allowSpaces) {
        const rule = (v) =>
          (v || "").indexOf(" ") < 0 || "Les espaces ne sont pas autorisés";

        rules.push(rule);
      }
      return rules;
    },
  },
  methods: {
    validateForm() {
      if (this.$refs.form.validate()) {
        return true;
      } else {
        alert("Certains champs de texte sont invalides");
      }
    },
    initFormValues() {
      console.log(this.currentBike);
      if (this.currentBike) {
        this.longitude = this.currentBike
          ? this.currentBike.location.coordinates[0]
          : "";
        this.latitude = this.currentBike
          ? this.currentBike.location.coordinates[1]
          : "";
        this.serial_number = this.currentBike
          ? this.currentBike.serial_number
          : "";
        this.service_status = this.currentBike
          ? this.currentBike.service_status
          : "";
        this.battery_level = this.currentBike
          ? this.currentBike.battery_level
          : "";
      }
    },
    // Enregistrer les modifications faites sur le vélo
    async save(id) {
      try {
        if (this.validateForm()) {
          let res = await fetch(
            `https://61c331d69cfb8f0017a3ea05.mockapi.io/bikes/` + id,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                serial_number: this.serial_number,
                location: {
                  coordinates: [this.longitude, this.latitude],
                },
                service_status: this.service_status,
                battery_level: this.battery_level,
              }),
            }
          );
          this.data = res;
          console.log(res);
          this.$emit("dataSaved");
          this.$emit("closeDrawer");

          this.isEditing = false;
          alert(
            "Le vélo n°" + this.currentBike.serial_number + " a été modifié"
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    // Envoie au parent un appel pour la fermeture du volet droit
    close() {
      this.isEditing = false;
      this.$emit("closeDrawer");
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