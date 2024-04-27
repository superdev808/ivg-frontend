import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const PieChartProgressBar = ({ percentage }: { percentage: number }) => {
  const data = [
    { name: "Progress", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const COLORS = ["#506c60", "#debea5"]; // Colors for the Pie segments

  return (
    <div className="relative">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx={75}
          cy={75}
          innerRadius={45}
          outerRadius={60}
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <p
        className="absolute text-2xl text-dark-green m-1 top-50 left-50"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {percentage}%
      </p>
    </div>
  );
};

export default PieChartProgressBar;
