import React, { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Ativo = () => {
  const { ticker } = useParams();
  const location = useLocation();

  // Recebe o preço passado pelo state do Link
  const currentPrice = location.state?.price || 'N/A'; // Caso o preço não seja passado, mostra 'N/A'

  // Importar imagens dinamicamente
  let macdImage, bollingerImage, rsiImage;
  try {
    macdImage = require(`../assets/macd_${ticker}.png`);
  } catch (error) {
    macdImage = null; // Ou um caminho para uma imagem padrão
  }
  try {
    bollingerImage = require(`../assets/bollinger_${ticker}.png`);
  } catch (error) {
    bollingerImage = null;
  }
  try {
    rsiImage = require(`../assets/rsi_${ticker}.png`);
  } catch (error) {
    rsiImage = null;
  }

  // Dados para o gráfico de Linha (Histórico de Valor)
  const lineData = useMemo(
    () => ({
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
    }),
    [ticker]
  );

  const lineOptions = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <div>
      {/* Subheader Bar */}
      <div style={{ backgroundColor: '#3B82F6' }} className="text-white py-2">
        <div className="container-md">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h1>
                {ticker}: {currentPrice}
              </h1>
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

        {/* Imagem MACD */}
        {macdImage ? (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">MACD</h5>
                  <div style={{ height: '400px' }}>
                    <img
                      src={macdImage}
                      alt={`MACD de ${ticker}`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Imagem Bandas de Bollinger */}
        {bollingerImage ? (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">Bandas de Bollinger</h5>
                  <div style={{ height: '400px' }}>
                    <img
                      src={bollingerImage}
                      alt={`Bandas de Bollinger de ${ticker}`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Imagem RSI */}
        {rsiImage ? (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">Índice de Força Relativa (RSI)</h5>
                  <div style={{ height: '400px' }}>
                    <img
                      src={rsiImage}
                      alt={`RSI de ${ticker}`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Ativo;
