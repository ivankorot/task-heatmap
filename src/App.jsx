import React from "react";
import data from "./assets/data.json";
import Heatmap from "./Heatmap/Heatmap";

const App = () => {
  const subtitle = `Found ${data.length.toLocaleString("en-US")} items!`;

  return (
    <div>
      <h1>Supercreator HeatMap Exercise</h1>
      <h2>{subtitle}</h2>
      <Heatmap />
    </div>
  );
};

export default App;
