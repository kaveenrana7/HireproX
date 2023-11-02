import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import "./index.css";

const Stat2 = ({jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec}) => {
  const data = [
    { month: "Jan", category: "Revenue", value: jan },
    { month: "Feb", category: "Revenue", value: feb },
    { month: "Mar", category: "Revenue", value: mar },
    { month: "Apr", category: "Revenue", value: apr },
    { month: "May", category: "Revenue", value: may },
    { month: "Jun", category: "Revenue", value: jun },
    { month: "Jul", category: "Revenue", value: jul },
    { month: "Aug", category: "Revenue", value: aug },
    { month: "Sep", category: "Revenue", value: sep },
    { month: "Oct", category: "Revenue", value: oct },
    { month: "Nov", category: "Revenue", value: nov },
    { month: "Dec", category: "Revenue", value: dec }
    // Add data for the remaining months
  ];

  return (
    <div className="stat2">
      <div className="stat-heading">Statistics</div>
      <div className="stat-subheading">Tasks By Month</div>
      <ResponsiveBar
        height={250}
        data={data}
        keys={["value"]}
        indexBy="month"
        groupMode="grouped"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
      />
    </div>
  );
};

export default Stat2;
