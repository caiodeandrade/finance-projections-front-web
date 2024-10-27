import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Importado para suportar gráficos de barras
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

// Registro dos componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Registrado para permitir gráficos de barras
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Ativo = () => {
  const { ticker } = useParams();

  // Mock data para demonstração. Substitua por dados reais conforme necessário
  const currentPrice = 150.25; // Preço atual do ativo

  // Dados para o gráfico de Linha (Histórico de Valor)
  const lineData = useMemo(() => ({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: `Histórico de Valor de ${ticker}`,
        data: [120, 190, 170, 210, 180, 200, 230],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  }), [ticker]);

  const lineOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Preço',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }), []);

  // Dados para o gráfico de MACD
  const macdData = useMemo(() => ({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'MACD',
        data: [2, 3, 2.5, 4, 3.5, 4.5, 5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        type: 'line', // Garantir que é um gráfico de linha
        tension: 0.4,
      },
      {
        label: 'Linha de Sinal',
        data: [1.5, 2.5, 2, 3.5, 3, 4, 4.5],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        type: 'line',
        tension: 0.4,
      },
      {
        label: 'Histograma',
        data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        type: 'bar', // Tipo de gráfico definido como 'bar'
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y1',
      },
    ],
  }), []);

  const macdOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        position: 'left',
        beginAtZero: false,
        title: {
          display: true,
          text: 'MACD',
        },
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // Evita sobreposição das grades
        },
        title: {
          display: true,
          text: 'Histograma',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }), []);

  // Dados para o gráfico de Bandas de Bollinger
  const bollingerData = useMemo(() => ({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'SMA',
        data: [100, 105, 102, 108, 107, 110, 115],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Banda Superior',
        data: [120, 125, 122, 128, 127, 130, 135],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Banda Inferior',
        data: [80, 85, 82, 88, 87, 90, 95],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  }), []);

  const bollingerOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Preço',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }), []);

  // Dados para o gráfico de RSI
  const rsiData = useMemo(() => ({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'RSI',
        data: [55, 60, 58, 65, 70, 75, 80],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Sobrecompra (70)',
        data: [70, 70, 70, 70, 70, 70, 70],
        borderColor: 'rgba(255, 206, 86, 1)',
        borderDash: [10, 5],
        fill: false,
        tension: 0,
      },
      {
        label: 'Sobrevenda (30)',
        data: [30, 30, 30, 30, 30, 30, 30],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [10, 5],
        fill: false,
        tension: 0,
      },
    ],
  }), []);

  const rsiOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'RSI',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }), []);

  return (
    <div>
      {/* Subheader Bar */}
      <div style={{ backgroundColor: '#3B82F6' }} className="text-white py-2">
        <div className="container-md">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h1>{ticker}: ${currentPrice}</h1>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="container-md ativo mt-4">
        {/* Gráfico de Linha (Histórico de Valor) */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Histórico de Valor</h5>
                {/* Define uma altura fixa para o gráfico */}
                <div style={{ height: '400px' }}>
                  <Line key={`${ticker}-line`} data={lineData} options={lineOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de MACD */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">MACD</h5>
                <div style={{ height: '400px' }}>
                  <Line key={`${ticker}-macd`} data={macdData} options={macdOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Bandas de Bollinger */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Bandas de Bollinger</h5>
                <div style={{ height: '400px' }}>
                  <Line key={`${ticker}-bollinger`} data={bollingerData} options={bollingerOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de RSI */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Índice de Força Relativa (RSI)</h5>
                <div style={{ height: '400px' }}>
                  <Line key={`${ticker}-rsi`} data={rsiData} options={rsiOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ativo;
