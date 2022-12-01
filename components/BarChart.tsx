import React, { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CategoryScale,
  Title,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CategoryScale,
  Title
);

interface IProps {
  chartData: {
    name: string;
    value: number;
  }[];
  width: string;
  height: string;
  orientation: string;
  title: string;
  titleSize: string;
  tickSize: string;
  [x: string]: any;
}

const color_pallete = [
  {
    backgroundColor: 'rgb(97,47,57)',
    borderColor: 'rgb(237,93,123)',
  },
  {
    backgroundColor: 'rgb(94,65,36)',
    borderColor: 'rgb(237,148,60)',
  },
  {
    backgroundColor: 'rgb(94,79,43)',
    borderColor: 'rgb(237,192,81)',
  },
  {
    backgroundColor: 'rgb(33,98,61)',
    borderColor: 'rgb(62,190,44)',
  },
  {
    backgroundColor: 'rgb(33,66,88)',
    borderColor: 'rgb(51,151,218)',
  },
  {
    backgroundColor: 'rgb(48,57,91)',
    borderColor: 'rgb(98,124,228)',
  },
  {
    backgroundColor: 'rgb(63,48,94)',
    borderColor: 'rgb(143,96,237)',
  },
];

function BarChart({
  chartData,
  orientation,
  width,
  height,
  title,
  titleSize,
  tickSize,
  ...props
}: IProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const config = (
    chartData: {
      name: string;
      value: number;
    }[]
  ) => {
    return {
      type: 'bar',
      data: {
        labels: chartData.map((item) => item.name),
        datasets: [
          {
            label: 'Audio Features',
            data: chartData.map((item) => item.value),
            borderWidth: 2,
            backgroundColor: color_pallete.map(
              (color) => color.backgroundColor
            ),
            borderColor: color_pallete.map((color) => color.borderColor),
          },
        ],
      },
    };
  };

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    // @ts-ignore
    const chart = new Chart(ctx, {
      ...config(chartData),
      options: {
        indexAxis: orientation == 'horizontal' ? 'y' : 'x',
        responsive: true,
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            display: true,
            grid: {
              color: 'white',
              lineWidth: 0.2,
            },
          },
          x: {
            display: true,
            grid: {
              color: 'white',
              lineWidth: 0.2,
            },
            ticks: {
              minRotation: 20,
              maxToration: 30,
              font: {
                size: tickSize,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => {
                const { label, dataset } = context;
                return `${label}: ${dataset.data[context.dataIndex]}`;
              },
            },
          },
          title: {
            display: true,
            text: title,
            color: 'white',
            font: {
              size: titleSize,
              weight: 'bold',
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        aspectRatio: 1 / 1,
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return (
    <>
      <Box
        {...props}
        width={width}
        height={height}
      >
        <canvas ref={canvas}></canvas>
      </Box>
    </>
  );
}

export default BarChart;
