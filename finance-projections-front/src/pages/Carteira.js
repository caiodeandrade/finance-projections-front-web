import React, { useState, useEffect, useMemo } from 'react';
import api from '../api'; // Importa o axios com a baseURL já configurada
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

// Registro dos componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Carteira = () => {
  const [patrimonioAtual, setPatrimonioAtual] = useState(0);

  useEffect(() => {
    const fetchPatrimonio = async () => {
      try {
        const response = await api.get('wallet/3'); 
        const { totalInvested } = response.data; 

        console.log(totalInvested);

        setPatrimonioAtual(totalInvested);


      } catch (error) {
        console.error('Erro ao buscar o patrimônio:', error);
      }
    };

    fetchPatrimonio();
  }, []);

  // Dados para o gráfico de Barras (Patrimônio dos Últimos 6 Meses)
  const patrimonioData = useMemo(() => ({
    labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'],
    datasets: [
      {
        label: 'Patrimônio (R$)',
        data: [20000, 21000, 22000, 23000, 24000, 30340.3], // Mock data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }), []);

  const patrimonioOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolução do Patrimônio nos Últimos 6 Meses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Patrimônio (R$)',
        },
      },
    },
  }), []);

  return (
    <div>
      {/* Subheader Bar */}
      <div className="bg-primary text-white py-3">
        <div className="container-md">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <strong>Patrimônio Atual:</strong> R$ {patrimonioAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-md carteira mt-4">
        <h1 className="text-center mb-4">Minha Carteira</h1>
        <p className="text-center">
          Bem-vindo à página de Carteira. Aqui você pode visualizar informações sobre sua carteira.
        </p>

        {/* Gráfico de Barras do Patrimônio */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Evolução do Patrimônio</h5>
                {/* Define uma altura fixa para o gráfico */}
                <div style={{ height: '400px' }}>
                  <Bar data={patrimonioData} options={patrimonioOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Você pode adicionar mais conteúdo ou gráficos aqui */}
      </div>
    </div>
  );
};

export default Carteira;
