
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  registerables as registerablesJS
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';
ChartJS.register(...registerablesJS);

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Revenue over Expenses',
      fill: false,
      borderColor: 'rgba(60, 150, 120, 0.5)',
      borderWidth: 2,
      backgroundColor: 'rgba(60, 150, 120, 0.5)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    },
    {
      type: 'bar',
      label: 'Revenue',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    },
    {
      type: 'bar',
      label: 'Expenses',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    },
  ],
};


export function LineChart() {
  return <Chart type='bar' data={data} />;
}
