<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-subheader>Charts</v-subheader>
        <v-list-item
          v-for="(item, i) in $store.state.chartTypes"
          :key="i"
          :id="i"
        >
          <v-chip
            draggable
            @dragstart="(e) => handleDragStart(e, item)"
            style="cursor:pointer"
          >
            <v-list-item-action>
              <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-chip>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-subheader>Dashboards</v-subheader>
        <v-text-field
          placeholder="search dashboard"
          v-model="searchDashboard"
        ></v-text-field>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in dashboards"
            :key="i"
            :id="i"
            @click="$store.commit('setCurrentLayout', item)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer></v-spacer>
      <v-text-field
        :value="$store.state.dashboardName"
        @input="(e) => $store.commit('setDashboardName', e)"
        :hide-details="true"
        style="max-width: 200px"
      >
      </v-text-field>
      <v-btn @click="saveDashboard" :disabled="!$store.state.dashboardName"
        >save
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container @drop="handleDrop" @dragover="handleDragOver">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dashName: "",
      searchDashboard: "",
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
    };
  },
  mounted() {
    this.$store.dispatch("getDashboards");
    this.$store.dispatch("getDatapoints");
  },
  computed: {
    ...mapState({
      layouts: "layouts",
    }),
    dashboards() {
      if (this.searchDashboard)
        return this.layouts.filter((l) =>
          l.name.includes(this.searchDashboard)
        );
      return this.layouts;
    },
  },

  methods: {
    handleDragStart(e, item) {
      e.dataTransfer.effectAllowed = "link";
      e.dataTransfer.setData("chartName", item.name);
    },
    handleDragOver(e) {
      e.preventDefault();
    },
    handleDrop(e) {
      this.$store.commit("setChartType", e.dataTransfer.getData("chartName"));
    },
    async saveDashboard() {
      await this.$store.dispatch("saveDashboard");
      await this.$store.dispatch("getDashboards");
    },
  },
};
</script>

<style></style>
