import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://kundera.ddns.net:9099/v1/tasks",
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLayout: [
      {
        breakpoint: "xl",
        numberOfCols: 12,
        Items: [
          { id: "0", x: 0, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "1", x: 2, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "2", x: 4, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "3", x: 6, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "4", x: 8, y: 0, width: 2, height: 2, type: "", data: {} },
          {
            id: "5",
            x: 10,
            y: 0,
            width: 2,
            height: 2,
            type: "",
            data: {},
          },
          { id: "6", x: 0, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "7", x: 2, y: 2, width: 2, height: 2, type: "", data: {} },
        ],
      },
      {
        breakpoint: "lg",
        breakpointWidth: 1200,
        numberOfCols: 10,
        Items: [
          { id: "0", x: 0, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "1", x: 2, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "2", x: 4, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "3", x: 6, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "4", x: 8, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "5", x: 0, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "6", x: 2, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "7", x: 4, y: 2, width: 2, height: 2, type: "", data: {} },
        ],
      },
      {
        breakpoint: "md",
        breakpointWidth: 996,
        numberOfCols: 8,
        Items: [
          {
            id: "0",
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            type: "",
            data: {},
          },
          { id: "1", x: 2, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "2", x: 4, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "3", x: 6, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "4", x: 0, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "5", x: 2, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "6", x: 4, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "7", x: 6, y: 2, width: 2, height: 2, type: "", data: {} },
        ],
      },
      {
        breakpoint: "sm",
        breakpointWidth: 768,
        numberOfCols: 4,
        Items: [
          { id: "0", x: 0, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "1", x: 2, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "2", x: 0, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "3", x: 2, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "4", x: 0, y: 4, width: 2, height: 2, type: "", data: {} },
          { id: "5", x: 2, y: 4, width: 2, height: 2, type: "", data: {} },
          { id: "6", x: 0, y: 6, width: 2, height: 2, type: "", data: {} },
          { id: "7", x: 2, y: 6, width: 2, height: 2, type: "", data: {} },
        ],
      },
      {
        breakpoint: "xs",
        breakpointWidth: 480,
        numberOfCols: 2,
        Items: [
          { id: "0", x: 0, y: 0, width: 2, height: 2, type: "", data: {} },
          { id: "1", x: 0, y: 2, width: 2, height: 2, type: "", data: {} },
          { id: "2", x: 0, y: 4, width: 2, height: 2, type: "", data: {} },
          { id: "3", x: 0, y: 6, width: 2, height: 2, type: "", data: {} },
          { id: "4", x: 0, y: 8, width: 2, height: 2, type: "", data: {} },
          {
            id: "5",
            x: 0,
            y: 10,
            width: 2,
            height: 2,
            type: "",
            data: {},
          },
          {
            id: "6",
            x: 0,
            y: 12,
            width: 2,
            height: 2,
            type: "",
            data: {},
          },
          { id: "7", x: 0, y: 14, width: 2, height: 2, type: "", data: {} },
        ],
      },
      {
        breakpoint: "xxs",
        breakpointWidth: 0,
        numberOfCols: 1,
        Items: [
          { id: "0", x: 0, y: 0, width: 1, height: 1, type: "", data: {} },
          { id: "1", x: 0, y: 2, width: 1, height: 1, type: "", data: {} },
          { id: "2", x: 0, y: 4, width: 1, height: 1, type: "", data: {} },
          { id: "3", x: 0, y: 6, width: 1, height: 1, type: "", data: {} },
          { id: "4", x: 0, y: 8, width: 1, height: 1, type: "", data: {} },
          {
            id: "5",
            x: 0,
            y: 10,
            width: 1,
            height: 1,
            type: "",
            data: {},
          },
          {
            id: "6",
            x: 0,
            y: 12,
            width: 1,
            height: 1,
            type: "",
            data: {},
          },
          { id: "7", x: 0, y: 14, width: 1, height: 1, type: "", data: {} },
        ],
      },
    ],
    dashboardName: "",
    layouts: [],
    dataPoints: [],
    chartTypes: [
      { name: "area", icon: "chart-areaspline" },
      { name: "bar", icon: "chart-bar" },
      { name: "bubble", icon: "chart-bubble" },
      { name: "donut", icon: "chart-donut" },
      { name: "heatmap", icon: "chart-areaspline-variant" },
      { name: "line", icon: "chart-line" },
      { name: "radialBar", icon: "chart-bar" },
      { name: "scatter", icon: "chart-scatter-plot" },
    ],
  },
  getters: {
    getChartTypes(state) {
      return state.chartTypes;
    },
    getChartOptions(state) {
      return state.chartOptions;
    },
    getSeries(state) {
      return state.series;
    },
  },
  mutations: {
    updateChartData(state, payload) {
      state.currentLayout = state.currentLayout.map((cl) => {
        return {
          ...cl,
          Items: cl.Items.map((i) => {
            if (i.id == payload.id) {
              console.log(payload);
              return { ...i, ...payload };
            } else {
              return i;
            }
          }),
        };
      });
      console.log(state);
    },
    setDashboardName(state, payload) {
      state.dashboardName = payload;
      console.log(payload);
    },
    removeChartType(state, payload) {
      state.currentLayout.forEach((cl) => {
        const index = cl.Items.findIndex((i) => i.type === payload);
        if (index >= 0) {
          cl.Items[index]["type"] = "";
        }
      });
    },
    setDataProp(state, { uri, id }) {
      // set chart types to all layout bps
      state.currentLayout = state.currentLayout.map((cl) => {
        return {
          ...cl,
          Items: cl.Items.map((i) => {
            let data = { ...i["data"] };
            if (i.id == id) {
              data = { ...data, [uri]: true };
            }
            return {
              ...i,
              data: data,
            };
          }),
        };
      });

      console.log(state);
    },
    setChartType(state, payload) {
      // set chart types to all layout bps
      state.currentLayout.forEach((cl) => {
        const index = cl.Items.findIndex((i) => i.type === "");
        if (index >= 0) {
          cl.Items[index]["type"] = payload;
        }
      });
    },
    setDataPoints(state, payload) {
      state.dataPoints = payload;
    },
    setLayouts(state, payload) {
      state.layouts = payload;
    },
    setCurrentLayout(state, payload) {
      state.currentLayout = [];
      state.currentLayout = [...payload.breakpoints];
      state.dashboardName = payload.name;
    },
  },
  actions: {
    async fetchData(ctx, { appendURI }) {
      return await Axios.get(`/list/type/data/name/${appendURI}`);
    },
    async saveDashboard(ctx) {
      return await Axios.put(
        `/reg/type/dash/name/${ctx.state.dashboardName}`,
        ctx.state.currentLayout
      );
    },
    async getDashboards(ctx) {
      const dash = await Axios.get("/list/type/dash");
      ctx.commit(
        "setLayouts",
        Object.keys(dash.data).map((key) => {
          return {
            ...dash.data[key],
            name: key,
          };
        })
      );
    },
    async getDatapoints(ctx) {
      const datapoints = await Axios.get("/list/type/datapoints");
      ctx.commit(
        "setDataPoints",
        Object.keys(datapoints.data).map((key) => datapoints.data[key])
      );
    },
  },
  modules: {},
});
