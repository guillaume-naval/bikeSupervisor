<template>
  <v-main class="pa-0 ma-0">
    <GmapMap
      @click="infoOpened = false"
      :zoom="11"
      :center="center"
      style="width: 100%; height: 100%"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker
        v-for="(bike, key) in bikes"
        :key="bike.id"
        :position="getPosition(bike.location)"
        :clickable="true"
        @click="toggleInfo(bike, key)"
        :icon="markerIcon(bike)"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened = false"
        v-if="infoContent"
      >
        <div>
          <div class="d-flex">
            <div class="d-flex flex-column mr-2">
              <span class="font-weight-bold"
                >Vélo n°{{ infoContent.serial_number }}</span
              >
              <span>
                <i
                  v-if="
                    infoContent.battery_level < 40 &&
                    infoContent.battery_level != 0
                  "
                  class="fas fa-battery-quarter"
                ></i>
                <i
                  v-else-if="
                    infoContent.battery_level > 39 &&
                    infoContent.battery_level < 60
                  "
                  class="fas fa-battery-half"
                ></i>
                <i
                  v-else-if="
                    infoContent.battery_level > 59 &&
                    infoContent.battery_level < 95
                  "
                  class="fas fa-battery-three-quarters"
                ></i>
                <i
                  v-else-if="infoContent.battery_level == 0"
                  class="fas fa-battery-empty"
                ></i>
                <i v-else class="fas fa-battery-full"></i>

                {{ infoContent.battery_level }} %
              </span>
              <p
                v-if="infoContent.service_status === 1"
                class="txt-green font-weight-bold"
              >
                Disponible
              </p>
              <p
                v-else-if="infoContent.service_status === 2"
                class="txt-orange font-weight-bold"
              >
                Réservé
              </p>
              <p v-else class="txt-red font-weight-bold">En utilisation</p>
            </div>
            <span class="d-flex flex-column justify-space-between">
              <i
                class="far fa-edit"
                @click.stop="openRightDrawer = !openRightDrawer"
              ></i
              ><i
                class="fas fa-trash-alt"
                @click="
                  deleteBike(infoContent.id, infoOpened);
                  fetchData();
                "
              ></i>
            </span>
          </div>
        </div>
      </gmap-info-window>
    </GmapMap>
    <RightDrawer
      @closeDrawer="openRightDrawer = !openRightDrawer"
      @dataSaved="fetchData()"
      :open="openRightDrawer"
      :currentBike="infoContent"
      ref="RightDrawer"
    />
  </v-main>
</template>
 
<script>
import RightDrawer from "./RightDrawer";
export default {
  name: "AddMap",

  components: {
    RightDrawer,
  },
  data() {
    return {
      openRightDrawer: false,
      data: this.fetchData(),
      center: {
        lat: 48.769097,
        lng: 2.329759,
      },
      bikes: [],
      bikeMarkerFree: {
        url: require("../assets/bicycle_free.png"),
        scaledSize: { width: 65, height: 65, f: "px", b: "px" },
      },
      bikeMarkerBooked: {
        url: require("../assets/bicycle_booked.png"),
        scaledSize: { width: 65, height: 65, f: "px", b: "px" },
      },
      bikeMarkerInUse: {
        url: require("../assets/bicycle_inuse.png"),
        scaledSize: { width: 65, height: 65, f: "px", b: "px" },
      },
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -50,
        },
      },
    };
  },
  methods: {
    // Récupération des données sur les vélos à partir de l'API
    fetchData() {
      this.infoOpened = false;
      fetch("https://622791f4d1b3ff08c1b38f15.mockapi.io/bikes/")
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          this.bikes = data.bikes;
          console.log(this.bikes);
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    // Attribution d'une icône en fonction du statut du vélo
    markerIcon: function (bike) {
      if (bike.service_status === 1) {
        return this.bikeMarkerFree;
      } else if (bike.service_status === 2) {
        return this.bikeMarkerBooked;
      } else {
        return this.bikeMarkerInUse;
      }
    },
    // Retourne la position du marker à partir des coordonnées du vélo
    getPosition: function (marker) {
      return {
        lat: parseFloat(marker.coordinates[1]),
        lng: parseFloat(marker.coordinates[0]),
      };
    },
    // Gestion de l'infobulle des vélos
    toggleInfo: function (bike, key) {
      this.infoPosition = this.getPosition(bike.location);
      this.infoContent = bike;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
    // Fonction pour supprimer un vélo
    deleteBike(id) {
      let confirmUserDeletion = confirm(
        "Voulez-vous vraiment supprimer ce vélo ?"
      );
      if (confirmUserDeletion == true) {
        this.infoOpened = false;
        try {
          fetch("https://622791f4d1b3ff08c1b38f15.mockapi.io/bikes/" + id, {
            method: "DELETE",
          });
        } catch (err) {
          console.log(err);
        }
        this.fetchData();
        alert("Le vélo a été supprimé !");
      }
    },
  },
};
</script>

<style scoped>
.txt-red {
  color: #f32a2a;
}
.txt-green {
  color: #05af0a;
}
.txt-orange {
  color: #f3882a;
}
p {
  margin: 0px !important;
}
div ::v-deep .gm-ui-hover-effect {
  display: none !important;
}
.fa-edit,
.fa-trash-alt {
  font-size: 1.2em;
  cursor: pointer;
}
.fa-trash-alt:hover,
.fa-edit:hover {
  color: rgb(0, 174, 255);
}
</style>