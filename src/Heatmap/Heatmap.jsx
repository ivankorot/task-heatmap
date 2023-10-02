import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../assets/data.json";
import { transformDataForHeatmap } from "../utils/heatmap.util";
import { options } from "./heatmap.options";

const Heatmap = () => {
  const [selectedBucketSize, setSelectedBucketSize] = useState(24); // Default bucket size: 24 cells
  const [heatmapData, setHeatmapData] = useState();

  useEffect(() => {
    setHeatmapData(transformDataForHeatmap(data, selectedBucketSize));
  }, [selectedBucketSize]);

  const handleBucketSizeChange = (event) => {
    setSelectedBucketSize(parseInt(event.target.value, 10));
  };

  return (
    <>
      {heatmapData && (
        <>
          {/* Dropdown for selecting daily bucket size */}
          <label>Select Daily Bucket Size:</label>
          <select value={selectedBucketSize} onChange={handleBucketSizeChange}>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>

          <ReactApexChart
            options={options}
            series={heatmapData}
            type="heatmap"
            height={350}
          />
        </>
      )}
    </>
  );
};

export default Heatmap;
