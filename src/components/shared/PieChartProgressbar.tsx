import React from 'react';
import { PieChart, Pie, Cell, Legend, Label } from 'recharts';

const PieChartProgressBar = ({ percentage }: { percentage: number }) => {
  const data = [{ name: 'Progress', value: percentage }, { name: 'Remaining', value: 100 - percentage }];

  const COLORS = ['#0088FE', '#E0E0E0']; // Colors for the Pie segments

  return (
    <>
        <PieChart width={200} height={200}>
        <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
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
        <p className='absolute text-2xl' style={{ top: "70px", left: "140px" }}>{percentage}%</p>
    </>
  );
};

export default PieChartProgressBar;