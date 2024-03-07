import { BubbleDataPoint, Chart, ChartTypeRegistry, Point,  } from 'chart.js/auto';
import { useEffect, useRef } from 'react'

const ScoreChart = () => {

  const chartInstance = useRef<Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (myChartRef) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
  
        chartInstance.current = new Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>(myChartRef, {
          type: 'doughnut',
          data: {
            labels: ['Ganadas:  44.74%', 'Perdidas: 55.26%'],
            datasets: [{
              data: [17, 21],
              backgroundColor: ['rgb(34 197 94)', 'rgb(239 68 68)'],
              hoverBackgroundColor: ['rgb(22 163 74)', 'rgb(220 38 38)'],
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
}

export default ScoreChart
