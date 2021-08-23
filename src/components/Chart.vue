<template>
  <div class="wrapper" style="height: 100%">
    <div :id="'chart' + chartData.id"></div>
    <v-dialog v-if="dialog" v-model="dialog" persistent width="400">
      <v-card>
        <v-card-title>
          Select The Datapoint
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="appendURI"
            item-text="Desc"
            item-value="URL"
            :items="dataPoints"
            filled
            label="Datapoint"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="closeDialog">
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!appendURI"
            color="primary"
            text
            @click="fetchData"
            :loading="fetching"
          >
            Fetch
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import VueApexChart from "vue-apexcharts";

export default {
  name: "Chart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  components: {
    VueApexChart,
  },
  data() {
    return {
      chart: null,
      series: [],
      options: {
        chart: {
          type: this.chartData.type,
          height: "100%",
        },
        series: [],
        noData: {
          text: "Loading...",
        },
      },
      dialog: false,
      appendURI: "",
      fetching: false,
    };
  },
  computed: {
    ...mapState({
      dataPoints: "dataPoints",
    }),
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
    },
  },
  mounted() {
    this.chart = new ApexCharts(
      document.querySelector(`#chart${this.chartData.id}`),
      this.options
    );

    this.chart.render().then(() => {
      if (!Object.keys(this.chartData.data).length) {
        this.dialog = true;
      } else {
        this.$store
          .dispatch("fetchData", {
            appendURI: Object.keys(this.chartData.data)[0],
          })
          .then((response) => {
            this.setData(response);
          });
      }
    });
  },
  beforeDestroy() {
    this.chart.destroy();
  },
  methods: {
    async fetchData() {
      try {
        this.fetching = true;
        this.$store.commit("setDataProp", {
          uri: this.appendURI,
          id: this.chartData.id,
        });
        const response = await this.$store.dispatch("fetchData", {
          appendURI: this.appendURI,
        });
        if (response.status === 200) {
          this.setData(response);
        }
      } catch (error) {
        console.log(error);
        this.$store.commit("removeChartType", this.chartData.type);
      } finally {
        this.fetching = false;
        this.dialog = false;
      }
    },
    async setData(response) {
      if (this.chartData.type === "bar") {
        this.series = [
          {
            data: response.data.map((o) => o.Y),
          },
        ];
        this.options = {
          xaxis: {
            categories: response.data.map((o) =>
              new Date(o.X).toLocaleDateString()
            ),
          },
        };
      } else if (this.chartData.type === "line") {
        this.series = [
          {
            name: "series-1",
            data: response.data.map((o) => o.Y),
          },
        ];
        this.options = {
          xaxis: {
            type: "datetime",
            categories: response.data.map((o) =>
              new Date(o.X).toLocaleDateString()
            ),
          },
        };
      } else if (this.chartData.type === "radialBar") {
        this.series = response.data.map((o) => o.Y);
        this.options = {
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function(w) {
                    let ans = 0;
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    response.data.map((o) => (ans += o.Y));
                    return ans;
                  },
                },
              },
            },
          },
          labels: response.data.map((o) => o.X),
        };
      } else if (this.chartData.type === "donut") {
        this.series = response.data.map((o) => o.Y);
        this.options = {
          labels: response.data.map((o) => new Date(o.X).toLocaleDateString()),
        };
      } else if (this.chartData.type === "area") {
        this.series = [
          {
            data: response.data.map((o) => [o.X, o.Y]),
          },
        ];
        this.options = {
          fill: {
            type: "gradient",
            // 'solid' / 'pattern' / 'image',
            // gradient: {
            //   shadeIntensity: 1,
            //   opacityFrom: 0.7,
            //   opacityTo: 0.9,
            //   stops: [0, 90, 100]
            // },
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.9,
              stops: [20, 100, 100, 100],
            },
          },
          chart: {
            dropShadow: {
              enabled: true,
              enabledOnSeries: undefined,
              top: 0,
              left: 0,
              blur: 1,
              color: "#000",
              opacity: 0.35,
            },
            redrawOnParentResize: true,
            type: "area",
            //height: 350,
            zoom: {
              enabled: true,
              // autoScaleYaxis: true
            },
            //foreColor: "#ccc",
            toolbar: {
              autoSelected: "pan",
              show: true,
            },
          },
          //colors: ["#00BAEC"],
          // grid: {
          //   borderColor: "#55545",
          //   clipMarkers: true,
          //   yaxis: {
          //     lines: {
          //       show: false
          //     }
          //   },
          // },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "Main Title",
            align: "center",
          },
          subtitle: {
            text: "SubTitle",
            align: "center",
          },
          markers: {
            size: 0,
            style: "hollow",
          },
          xaxis: {
            type: "datetime",
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            offsetX: -10,
          },
          tooltip: {
            //shared: true
            x: {
              format: "dd MMM yyyy",
            },
            formatter: function(timestamp) {
              console.log(timestamp);
              return moment(timestamp).format("dd MMM yyyy");
            },
          },
        };
      } else if (this.chartData.type === "heatmap") {
        this.series = [
          {
            name: "Arslan",
            data: response.data.map((o) => [o.X, o.Y + 32, Math.abs(o.Y + 32)]),
          },
          {
            name: "Joe",
            data: response.data.map((o) => [o.X, o.Y, Math.abs(o.Y)]),
          },
          {
            name: "David",
            data: response.data.map((o) => [o.X, o.Y - 32, Math.abs(o.Y - 32)]),
          },
        ];
        // this.series = response.data.map(o => {
        //   return {
        //     name: new Date(o.X).toLocaleDateString(),
        //     data: generateHeatData(o.Y, {
        //       min: 0,
        //       max: 90
        //     })
        //   };
        // });
        this.options = {
          chart: {
            type: "heatmap",
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#008FFB"],
        };
      } else if (this.chartData.type === "bubble") {
        this.series = [
          {
            name: "Arslan",
            data: response.data.map((o) => [o.X, o.Y + 32, Math.abs(o.Y + 32)]),
          },
          {
            name: "Joe",
            data: response.data.map((o) => [o.X, o.Y, Math.abs(o.Y)]),
          },
        ];
        this.options = {
          xaxis: {
            type: "datetime",
            min: response.data[0]["X"],
            tickAmount: 8,
            labels: {
              rotate: -15,
              rotateAlways: false,
              formatter: function(timestamp) {
                return moment(new Date(timestamp)).format("MM/yyyy");
              },
            },
          },
        };
      } else if (this.chartData.type === "scatter") {
        this.series = [
          {
            name: "Arslan",
            data: response.data.map((o) => [o.X, o.Y + 32]),
          },
          {
            name: "Joe",
            data: response.data.map((o) => [o.X, o.Y]),
          },
        ];
        this.options = {
          xaxis: {
            type: "datetime",
            min: response.data[0]["X"],
            tickAmount: 8,
            labels: {
              rotate: -15,
              rotateAlways: false,
              formatter: function(timestamp) {
                return moment(new Date(timestamp)).format("MM/YYYY");
              },
            },
          },
        };
      }

      await this.chart.updateOptions(
        {
          ...this.options,
          series: this.series,
        },
        true
      );
    },
    closeDialog() {
      this.dialog = false;
      this.$store.commit("removeChartType", this.chartData.type);
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
}
</style>
