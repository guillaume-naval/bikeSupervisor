<template>
  <v-navigation-drawer v-model="drawerOpen" @input="onInput" absolute right>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "RightDrawer",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerOpen: this.open,
    };
  },
  watch: {
    open(newVal) {
      this.drawerOpen = newVal;
    },
  },
  methods: {
    onInput(isOpen) {
      this.$emit("drawerOpened", isOpen);
    },
  },
};
</script>