import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Busca.css';

const Busca = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock dos ativos que seriam exibidos após a busca
  const ativos = [
    { id: 1, nome: 'PETR4', empresa: 'Petrobras PN', valor: 'R$ 29,50' },
    { id: 2, nome: 'VALE3', empresa: 'Vale ON', valor: 'R$ 80,10' },
    { id: 3, nome: 'ITUB4', empresa: 'Itaú Unibanco PN', valor: 'R$ 22,30' },
    { id: 4, nome: 'BBDC4', empresa: 'Bradesco PN', valor: 'R$ 15,60' },
    { id: 5, nome: 'BBAS3', empresa: 'Banco do Brasil ON', valor: 'R$ 43,20' },
    { id: 6, nome: 'ABEV3', empresa: 'Ambev ON', valor: 'R$ 17,50' },
    { id: 7, nome: 'JBSS3', empresa: 'JBS ON', valor: 'R$ 25,70' },
    { id: 8, nome: 'ELET3', empresa: 'Eletrobras ON', valor: 'R$ 42,30' },
    { id: 9, nome: 'WEGE3', empresa: 'WEG ON', valor: 'R$ 32,10' },
    { id: 10, nome: 'GGBR4', empresa: 'Gerdau PN', valor: 'R$ 19,40' },
  ];

  // Mock dos top 5 das empresas
  const top5Valiosas = [
    { nome: 'PETR4', empresa: 'Petrobras', valor: 'R$ 495,65 B' },
    { nome: 'ITUB4', empresa: 'Itaú Unibanco', valor: 'R$ 322,73 B' },
    { nome: 'VALE3', empresa: 'Vale', valor: 'R$ 282,37 B' },
    { nome: 'WEGE3', empresa: 'WEG', valor: 'R$ 233,62 B' },
    { nome: 'ABEV3', empresa: 'Ambev', valor: 'R$ 201,07 B' },
  ];

  const top5Dividend = [
    { nome: 'SYNE3', empresa: 'SYN', valor: '35,11%' },
    { nome: 'ALLD3', empresa: 'Allied', valor: '26,96%' },
    { nome: 'LEVE3', empresa: 'Mahle-Metal Leve', valor: '26,17%' },
    { nome: 'PATI3', empresa: 'Pantalica', valor: '24,05%' },
    { nome: 'EVEN3', empresa: 'Even', valor: '18,62%' },
  ];

  const top5Receitas = [
    { nome: 'PETR4', empresa: 'Petrobras', valor: 'R$ 499,07 B' },
    { nome: 'JBSS3', empresa: 'JBS', valor: 'R$ 377,50 B' },
    { nome: 'ITUB4', empresa: 'Itaú Unibanco', valor: 'R$ 321,63 B' },
    { nome: 'BBAS3', empresa: 'Banco do Brasil', valor: 'R$ 265,89 B' },
    { nome: 'RAIZ4', empresa: 'Raízen', valor: 'R$ 229,39 B' },
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearching(true);
  };

  // Função para mostrar todos os resultados
  const handleShowAll = () => {
    handleSearch(''); // Faz uma busca com string vazia
  };

  return (
    <div className="busca">
      <div className="search-subheader">
        <h1>Pesquise pelo ativo desejado para ter acesso a cotações, fundamentos e gráficos</h1>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <div className="search-container">
                <Input
                  type="text"
                  placeholder="Pesquise pelo ativo desejado"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar"
                />
                <Button color="primary" onClick={() => handleSearch(searchTerm)} className="search-btn">
                  PESQUISAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isSearching ? (
        <div className="curiosity-section">
          <div className="busca__container">
            <h2>Rankings de Ações</h2>
            <div className="curiosity-cards">
              <div className="curiosity-card">
                <h3>Maiores Valor de Mercado</h3>
                <ul>
                  {top5Valiosas.map((empresa, index) => (
                    <li key={index}>
                      <strong>{empresa.nome}</strong> - {empresa.empresa} - {empresa.valor}
                    </li>
                  ))}
                </ul>
                <Button color="secondary" onClick={handleShowAll} className="view-more-btn">
                  Ver Todas
                </Button>
              </div>
              <div className="curiosity-card">
                <h3>Maiores Dividend Yield</h3>
                <ul>
                  {top5Dividend.map((empresa, index) => (
                    <li key={index}>
                      <strong>{empresa.nome}</strong> - {empresa.empresa} - {empresa.valor}
                    </li>
                  ))}
                </ul>
                <Button color="secondary" onClick={handleShowAll} className="view-more-btn">
                  Ver Todas
                </Button>
              </div>
              <div className="curiosity-card">
                <h3>Maiores Receitas</h3>
                <ul>
                  {top5Receitas.map((empresa, index) => (
                    <li key={index}>
                      <strong>{empresa.nome}</strong> - {empresa.empresa} - {empresa.valor}
                    </li>
                  ))}
                </ul>
                <Button color="secondary" onClick={handleShowAll} className="view-more-btn">
                  Ver Todas
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="search-results busca__container">
          <h2>Resultados da Busca</h2>
          <ul>
            {ativos
              .filter((ativo) =>
                ativo.nome.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ativo) => (
                <li key={ativo.id} className="search-result-item">
                  <Link
                    to={`/ativo/${ativo.nome}`}
                    state={{ price: ativo.valor }}
                    className="result-link"
                  >
                    <div>
                      <strong>{ativo.nome}</strong>
                      <span className="empresa">{ativo.empresa}</span>
                    </div>
                    <div className="valor">{ativo.valor}</div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Busca;
