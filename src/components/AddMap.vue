<template>
  <div>
    <GmapMap :zoom="12" :center="center" style="width: 1280px; height: 720px">
      <GmapMarker
        v-for="(bike, key) in bikes"
        :key="key"
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
        >Vélo n°{{ infoContent.serial_number }}
        <br />
        Niveau de batterie : {{ infoContent.battery_level }} %
        <br />
        <span v-if="infoContent.service_status === 1">Disponible</span>
        <span v-else-if="infoContent.service_status === 2">Réservé</span>
        <span v-else>En utilisation</span>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>
 
<script>
export default {
  name: "AddMap",
  data() {
    return {
      center: {
        lat: 48.863802704745304,
        lng: 2.3370770185405605,
      },
      bikes: [
        {
          battery_level: 85,
          service_status: 1,
          in_order: true,
          location: {
            coordinates: [2.30082, 48.7546],
            type: "Point",
          },
          serial_number: "AZX76B",
          id: "507f1f77bcf86cd799439011",
        },
        {
          battery_level: 77,
          service_status: 3,
          in_order: true,
          location: {
            coordinates: [2.30091, 48.765],
            type: "Point",
          },
          serial_number: "P3DB6F",
          id: "cf38d99b87664e7a80565ffb",
        },
        {
          battery_level: 67,
          service_status: 2,
          in_order: false,
          location: {
            coordinates: [2.32145, 48.7566],
            type: "Point",
          },
          serial_number: "KAYO32",
          id: "c1eeea27a5c340c4bd0fda2c",
        },
      ],
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
    markerIcon: function (bike) {
      if (bike.service_status === 1) {
        return this.bikeMarkerFree;
      } else if (bike.service_status === 2) {
        return this.bikeMarkerBooked;
      } else {
        return this.bikeMarkerInUse;
      }
    },
    getPosition: function (marker) {
      console.log(marker);
      return {
        lat: parseFloat(marker.coordinates[1]),
        lng: parseFloat(marker.coordinates[0]),
      };
    },
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
  },
};
</script>