export const options = {
  chart: {
    type: "heatmap",
    toolbar: {
      show: false,
    },
  },
  markers: {
    size: 4,
  },
  plotOptions: {
    heatmap: {
      radius: 150,
      enableShades: true,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 80,
            color: "#0082FC",
          },
          {
            from: 80,
            to: 160,
            color: "#0045FC",
          },
          {
            from: 160,
            to: 240,
            color: "#0F00FC",
          },
          {
            from: 200,
            to: 250,
            color: "#FC8600",
          },
          {
            from: 250,
            to: 400,
            color: "#FC0000",
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
};
