<template>
  <div>
    <GmapMap :zoom="12" :center="center" style="width: 1280px; height: 720px">
      <GmapMarker
        v-for="(bike, key) in bikes"
        :key="key"
        :position="getPosition(bike.location)"
        :clickable="true"
      />
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
          service_status: 1,
          in_order: false,
          location: {
            coordinates: [2.32145, 48.7566],
            type: "Point",
          },
          serial_number: "KAYO32",
          id: "c1eeea27a5c340c4bd0fda2c",
        },
      ],
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  methods: {
    getPosition: function (marker) {
      console.log(marker);
      return {
        lat: parseFloat(marker.coordinates[1]),
        lng: parseFloat(marker.coordinates[0]),
      };
    },
  },
};
</script>