import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../assets/data.json";
import {
  calculateColorRange,
  transformDataForHeatmap,
} from "../utils/heatmap.util";
import { options } from "./heatmap.options";
import { ChromePicker } from "react-color";
import { colorRangesConstant } from "./constants/color-ranges.constant";

const Heatmap = () => {
  const [selectedBucketSize, setSelectedBucketSize] = useState(24); // Default bucket size: 24 cells
  const [color, setColor] = useState({ hex: "#561ecb" });
  const [colorRanges, setColorRanges] = useState(colorRangesConstant);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    setHeatmapData(transformDataForHeatmap(data, selectedBucketSize));
  }, [selectedBucketSize]);

  useEffect(() => {
    if (heatmapData.length > 0) {
      setColorRanges(calculateColorRange(heatmapData, colorRanges));
    }
  }, [heatmapData]);

  const handleBucketSizeChange = (event) => {
    setSelectedBucketSize(parseInt(event.target.value, 10));
  };

  const handleSetColorRange = (index) => {
    setColorRanges((prevState) => {
      const newItems = [...prevState];
      newItems[index] = { ...prevState[index], color: color.hex };

      return newItems;
    });
  };

  const handleRemoveColorRange = (index) => {
    const arr = [...colorRanges];

    if (index !== -1) {
      arr.splice(index, 1);
      setColorRanges(calculateColorRange(heatmapData, arr));
    }
  };

  const handleAddHeatLevel = () => {
    setColorRanges((current) => {
      const updatedColorRanges = [
        ...current,
        {
          from: 0,
          to: 0,
          color: color.hex,
        },
      ];

      return calculateColorRange(heatmapData, updatedColorRanges);
    });
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

          <div>
            <label>Select Number of Heat Levels:</label>
            <ChromePicker color={color} onChange={setColor} />
            {colorRanges.map((value, index) => (
              <div>
                Color range for values from {value.from} to {value.to} -{" "}
                <button
                  type={"button"}
                  onClick={() => handleSetColorRange(index)}
                >
                  Select color
                </button>
                <button
                  type={"button"}
                  onClick={() => handleRemoveColorRange(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button type={"button"} onClick={handleAddHeatLevel}>
              Add heat level
            </button>
          </div>
          <ReactApexChart
            options={options(colorRanges)}
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
