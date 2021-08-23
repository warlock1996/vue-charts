<template>
  <v-card
    light
    :elevation="4"
    style="padding: 10px;"
    :height="height"
    :width="width"
  >
    <slot> </slot>
  </v-card>
</template>

<script>
export default {
  inject: ["$item"],
  data() {
    return {};
  },
  computed: {
    item() {
      return this.$item();
    },
    width() {
      if (this.item) {
        return this.item.widthPx;
      }
      return 0;
    },
    height() {
      if (this.item) {
        return this.item.heightPx;
      }
      return 0;
    }
  }
};
</script>
