import React from "react";
import { PieChart, Pie, Cell, Legend, Label } from "recharts";

const PieChartProgressBar = ({ percentage }: { percentage: number }) => {
  const data = [
    { name: "Progress", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const COLORS = ["#83B899", "#E0E0E0"]; // Colors for the Pie segments

  return (
    <div className="relative">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx={75}
          cy={75}
          innerRadius={45}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <p
        className="absolute text-2xl m-1 top-50 left-50"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {percentage}%
      </p>
    </div>
  );
};

export default PieChartProgressBar;
