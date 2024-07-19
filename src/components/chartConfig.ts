import { Filler } from "chart.js";

export const data = {
  labels: ['10', '07', '04', '01', '28', '25', '22', '19', '16', '13'],
  datasets: [
    {
      label: 'Data One',
      data: [1, 0, 0, 2, 0, 0, 3, 2, 5, 1],
      fill: true,
      cubicInterpolationMode: 'monotone',
      pointBorderColor: 'white',
      //@ts-ignore
      backgroundColor: (ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 180);
        gradient.addColorStop(0, 'rgb(66, 135, 245, 0.8)');
        gradient.addColorStop(1, 'rgb(66, 135, 245, .000000001)');

        return gradient;
      },
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  elements: {
    point: {
      radius: 0
    }
  }
}
