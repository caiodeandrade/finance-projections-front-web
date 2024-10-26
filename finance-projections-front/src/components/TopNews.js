import React from 'react';
import './TopNews.css';

const TopNews = () => {
  // Mock de notícias relacionadas ao mercado financeiro
  const news = [
    {
      id: 1,
      title: 'Bolsa de Valores fecha em alta com otimismo sobre inflação',
      image: 'https://via.placeholder.com/300x200',
      description: 'A B3 registrou ganhos nesta terça-feira, impulsionada por dados positivos de inflação nos Estados Unidos.',
    },
    {
      id: 2,
      title: 'Dólar sobe após dados fracos da economia global',
      image: 'https://via.placeholder.com/300x200',
      description: 'O dólar fechou em alta devido a preocupações com o enfraquecimento da economia mundial e novas tensões comerciais.',
    },
    {
      id: 3,
      title: 'Taxa Selic deve permanecer estável, aponta relatório do Banco Central',
      image: 'https://via.placeholder.com/300x200',
      description: 'Relatório do Banco Central indica que a taxa Selic permanecerá inalterada nos próximos meses devido à estabilidade econômica.',
    },
  ];

  return (
    <div className="top-news">
      <h2>Notícias do mercado financeiro</h2>
      <div className="top-news__grid">
        {news.map((item) => (
          <div key={item.id} className="top-news__card">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNews;
