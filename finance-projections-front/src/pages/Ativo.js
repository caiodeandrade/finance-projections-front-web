import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ativo = () => {
  const { ticker } = useParams();

  const [currentPrice, setCurrentPrice] = useState('N/A');
  const [recommendation, setRecommendation] = useState('Carregando...');
  let historicalImage, macdImage, bollingerImage, rsiImage;

  // Tenta carregar as imagens do ativo
  try {
    historicalImage = require(`../assets/${ticker}.png`);
  } catch (error) {
    historicalImage = null;
  }
  try {
    macdImage = require(`../assets/macd_${ticker}.png`);
  } catch (error) {
    macdImage = null;
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

  // Busca os dados do ativo e calcula a recomendação
  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await api.get(`/asset/find?ticker=${ticker}`);
        const assetData = response.data[0]; // Acessa o primeiro item do array retornado

        const price = parseFloat(assetData.price);
        const rsi = parseInt(assetData.rsi);
        const scom = parseInt(assetData.scom);
        const sven = parseInt(assetData.sven);
        const bbl = parseFloat(assetData.bbl);
        const bbs = parseFloat(assetData.bbs);

        // Define a lógica para RSI
        let rsiRecommendation =
          rsi < sven ? 'Compra' : rsi > scom ? 'Venda' : 'Manter Posição';

        console.log(1);

        // Define a lógica para Bandas de Bollinger
        let bbRecommendation =
          price < bbl ? 'Compra' : price > bbs ? 'Venda' : 'Manter Posição';
          console.log(2);
        // Combina as recomendações
        let finalRecommendation =
          rsiRecommendation === 'Compra' || bbRecommendation === 'Compra'
            ? 'Compra'
            : rsiRecommendation === 'Venda' || bbRecommendation === 'Venda'
            ? 'Venda'
            : 'Manter Posição';
            console.log(3);
        setRecommendation(finalRecommendation);
        setCurrentPrice(
          price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        );
      } catch (error) {
        console.error('Erro ao buscar os dados do ativo:', error);
        setRecommendation('Erro ao carregar');
      }
    };

    fetchAssetData();
  }, [ticker]);

  const handleAddToPortfolio = () => {
    console.log(`${ticker} adicionado à carteira!`);
    alert(`${ticker} foi adicionado à sua carteira.`);
  };

  return (
    <div>
      {/* Subheader Bar */}
      <div style={{ backgroundColor: '#3B82F6' }} className="text-white py-2">
        <div className="container-md">
          <div className="d-flex justify-content-between align-items-center">
            <h1>
              {ticker}: {currentPrice !== 'N/A' ? currentPrice : 'N/A'}
            </h1>
            <button
              className="btn btn-success"
              onClick={handleAddToPortfolio}
            >
              Adicionar à Carteira
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-md ativo mt-4">
        {/* Imagem do Histórico de Valor */}
        {historicalImage && (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">Histórico de Preço</h5>
                  <div style={{ height: '400px', textAlign: 'center' }}>
                    <img
                      src={historicalImage}
                      alt={`Histórico de Valor de ${ticker}`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Imagem MACD */}
        {macdImage && (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">MACD</h5>
                  <div style={{ height: '400px', textAlign: 'center' }}>
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
        )}

        {/* Imagem Bandas de Bollinger */}
        {bollingerImage && (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">Bandas de Bollinger</h5>
                  <div style={{ height: '400px', textAlign: 'center' }}>
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
        )}

        {/* Imagem RSI */}
        {rsiImage && (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card my-4">
                <div className="card-body">
                  <h5 className="card-title">Índice de Força Relativa (RSI)</h5>
                  <div style={{ height: '400px', textAlign: 'center' }}>
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
        )}

        {/* Explicação dos Indicadores */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-10" style={{ textAlign: 'left' }}>
            <h5 className="mb-3">Como Analisar os Indicadores</h5>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                <strong>MACD (Moving Average Convergence Divergence):</strong>  
                <br />Interpretação: Mostra o momento (força) do preço.  
                <br />Como usar: Quando a linha azul (MACD) cruza para cima da linha vermelha (Sinal), é tendência de alta (compra). Quando cruza para baixo, é tendência de baixa (venda).
              </li>
              <li className="mt-3">
                <strong>RSI (Relative Strength Index):</strong>  
                <br />Interpretação: Mede se o preço está sobrecomprado ou sobrevendido.  
                <br />Como usar: Valores acima de 70 sugerem que o ativo está caro (venda). Valores abaixo de 30 sugerem que está barato (compra).
              </li>
              <li className="mt-3">
                <strong>Bandas de Bollinger:</strong>  
                <br />Interpretação: Mostra os limites de preço em um intervalo de tempo.  
                <br />Como usar: Quando o preço está acima da banda superior, pode estar caro (venda). Quando está abaixo da banda inferior, pode estar barato (compra).
              </li>
            </ul>
          </div>
        </div>

        {/* Recomendação */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-10" style={{ textAlign: 'left' }}>
            <p>
              <strong>De acordo com a análise dos indicadores, nossa recomendação é:</strong>
            </p>
            <span
              className={`badge ${
                recommendation === 'Compra'
                  ? 'bg-success'
                  : recommendation === 'Venda'
                  ? 'bg-danger'
                  : 'bg-warning text-dark'
              }`}
              style={{ fontSize: '1rem', padding: '10px' }}
            >
              {recommendation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ativo;
