<template>
  <Dashboard :id="'apexCharts'">
    <DashLayout
      v-for="layout in currentLayout"
      :key="layout.breakpoint"
      v-bind="layout"
    >
      <DashItem
        v-for="item in layout.Items"
        :key="item.id"
        v-bind.sync="item"
        @moveEnd="onMoveEnd"
        @resizeEnd="onResizeEnd"
      >
        <Master v-if="item.type">
          <Chart :chart-data="item" />
        </Master>
      </DashItem>
    </DashLayout>
  </Dashboard>
</template>

<script>
import { mapState } from "vuex";
import { Dashboard, DashLayout, DashItem } from "vue-responsive-dash";
import Master from "@/components/Master.vue";
import Chart from "@/components/Chart.vue";

export default {
  name: "Home",
  components: {
    Dashboard,
    DashLayout,
    DashItem,
    Master,
    Chart,
  },
  
  methods: {
    onMoveEnd(e) {
      this.$store.commit("updateChartData", e);
    },
    onResizeEnd(e) {
      this.$store.commit("updateChartData", e);
    },
  },
  computed: {
    ...mapState(["chartOptions", "chartsData"]),
    currentLayout() {
      return JSON.parse(JSON.stringify(this.$store.state.currentLayout));
    },
  },
};
</script>
