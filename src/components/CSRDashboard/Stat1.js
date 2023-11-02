import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./index.css";

const Stat1 = ({hairdressing=0,lawnmoving=0,gardening=0,cleaning=0}) => {
  const data = [
    {
      id: "Hair Dressing",
      value: hairdressing,
      color: "#FF6384",
    },
    {
      id: "Lawn Mowing",
      value: lawnmoving,
      color: "#36A2EB",
    },
  
    {
      id: "Cleaning",
      value: cleaning,
      color: "#4BC0C0",
    },
  ];

  return (
    <div className="stat1">
      <div className="stat-heading">Favorite Tasks</div>
      <div className="stat-subheading">Based on contracts</div>
      <div className="doughnut-chart" style={{ height: "250px" }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 20, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
        />
      </div>
    </div>
  );
};

export default Stat1;
