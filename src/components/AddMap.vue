<template>
  <div>
    <gmap-map :zoom="12" :center="center" style="width: 1280px; height: 720px">
    </gmap-map>
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
      bikes: {},
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
    };
  },
  beforeMount() {
    this.getName();
  },
  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
  },
};
</script>