import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChartComponent({ dimensionResults }) {
  if (!dimensionResults || dimensionResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
        Data evaluasi belum tersedia. Silakan lengkapi angket evaluasi diri.
      </div>
    );
  }

  const labels = dimensionResults.map((dim) => dim.shortName || dim.name);
  const dataValues = dimensionResults.map((dim) => dim.percentage);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Capaian Kompetensi (%)',
        data: dataValues,
        backgroundColor: 'rgba(37, 99, 235, 0.25)',
        borderColor: '#2563eb',
        borderWidth: 2.5,
        pointBackgroundColor: '#1d4ed8',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#1d4ed8',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Batas Kategori Sangat Tinggi (80%)',
        data: [80, 80, 80, 80, 80],
        backgroundColor: 'transparent',
        borderColor: 'rgba(16, 185, 129, 0.4)',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(203, 213, 225, 0.6)',
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.8)',
        },
        pointLabels: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11,
            weight: '600',
          },
          color: '#1e293b',
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 20,
          display: true,
          backdropColor: 'transparent',
          color: '#64748b',
          font: {
            size: 9,
          },
          callback: (value) => `${value}%`,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11,
          },
          color: '#334155',
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
          weight: 'bold',
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
        },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const raw = context.raw;
            let cat = 'Perlu Peningkatan';
            if (raw >= 80) cat = 'Sangat Tinggi';
            else if (raw >= 60) cat = 'Tinggi';
            else if (raw >= 40) cat = 'Cukup';

            return ` Skor: ${raw}% (${cat})`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] flex items-center justify-center p-2">
      <Radar data={data} options={options} />
    </div>
  );
}

