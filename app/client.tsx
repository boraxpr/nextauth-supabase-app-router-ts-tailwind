"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

interface BarChartProps {
  data: {
    day: string;
    value: number;
  }[];
}

export const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar
          dataKey="value"
          fill="#f37221"
          radius={[15, 15, 0, 0]}
          barSize={20}
          stroke="#000000"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

type RadialChartProps = {
  data: {
    name: string;
    uv: number;
    fill: string;
  }[];
};
const CustomizedLegend: React.FC<{ data: RadialChartProps["data"] }> = ({
  data,
}) => {
  // Customized legend content
  return (
    <ul className="mx-5">
      {data.map((entry, index) => (
        <li key={`item-${index}`}>{entry.name}</li>
      ))}
    </ul>
  );
};
export const RadialChartComponent = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        data={data}
        innerRadius={50}
        outerRadius={125}
        startAngle={180}
        endAngle={-180}
        barSize={20}
      >
        <RadialBar cornerRadius={15} background dataKey="uv" />
        <Legend
          width={120}
          height={140}
          layout="horizontal"
          verticalAlign="middle"
          align="right"
          content={<CustomizedLegend data={data} />}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
