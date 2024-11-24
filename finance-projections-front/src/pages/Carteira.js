import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Para realizar requisições HTTP

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Carteira = () => {
  const [ativos, setAtivos] = useState([]);
  const [patrimonioAtual, setPatrimonioAtual] = useState(0);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://finance-api-silk-five.vercel.app/wallet/2'
        );
        const wallet = response.data;

        // Transformando os dados recebidos
        const ativosFormatados = wallet.assets.map((item) => ({
          id: item.id,
          nome: item.asset.ticker,
          valor: item.asset.price * item.quantity, // Calcula o valor total do ativo
        }));

        // Atualiza o estado com os ativos formatados
        setAtivos(ativosFormatados);

        // Calcula e define o patrimônio atual
        const totalPatrimonio = ativosFormatados.reduce(
          (acc, ativo) => acc + ativo.valor,
          0
        );
        setPatrimonioAtual(totalPatrimonio);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  // Dados para o gráfico de Barras
  const patrimonioData = useMemo(
    () => ({
      labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'],
      datasets: [
        {
          label: 'Patrimônio (R$)',
          data: [0, 0, 0, 0, 0, patrimonioAtual],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }),
    [patrimonioAtual]
  );

  const patrimonioOptions = useMemo(
    () => ({
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
    }),
    []
  );

  // Dados para o gráfico de pizza (porcentagem por ativo)
  const pieData = useMemo(() => {
    const total = patrimonioAtual;
    const labels = ativos.map((ativo) => ativo.nome);
    const data = ativos.map((ativo) => (ativo.valor / total) * 100);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [patrimonioAtual, ativos]);

  return (
    <div>
      {/* Subheader */}
      <div className="bg-primary text-white py-3">
        <div className="container-md">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <strong>Patrimônio Atual:</strong> R${' '}
              {patrimonioAtual.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-md carteira mt-4">
        <h1 className="text-center mb-4">Minha Carteira</h1>
        <p className="text-center">
          Bem-vindo à página de Carteira. Aqui você pode visualizar informações
          sobre sua carteira.
        </p>

        {/* Gráfico de Barras */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Evolução do Patrimônio</h5>
                <div style={{ height: '400px' }}>
                  <Bar data={patrimonioData} options={patrimonioOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Pizza */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Distribuição de Ativos
                </h5>
                <div
                  className="d-flex justify-content-center"
                  style={{ height: '400px' }}
                >
                  <Pie data={pieData} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Ativos */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Ativos da Carteira</h5>
                <ul className="list-group">
                  {ativos.map((ativo) => (
                    <li
                      key={ativo.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <Link
                        to={`/ativo/${ativo.nome}`}
                        className="text-decoration-none text-dark flex-grow-1 text-start"
                      >
                        {ativo.nome}
                      </Link>
                      <span className="badge bg-primary text-white">
                        R$ {ativo.valor.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carteira;
