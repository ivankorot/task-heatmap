export const options = (colorRanges) => {
  return {
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
        distributed: true,
        shadeIntensity: 0.9,
        colorScale: {
          ranges: colorRanges,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
};
