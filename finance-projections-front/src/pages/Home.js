import React from 'react';
import './Home.css';
import TopNews from '../components/TopNews';  // Caminho atualizado

function Home() {
  return (
    <div className="home">
      <div className="home__container"> {/* Novo contêiner de largura limitada */}
        <section className="intro">
          <h1>Bem-vindo ao Finance Projections</h1>
          <p>
          Descubra uma plataforma confiável e inteligente, projetada para acompanhar seus investimentos de forma precisa e estratégica. Com o Finance Projections, você terá acesso a análises detalhadas, insights valiosos e as melhores oportunidades do mercado financeiro, tudo em um só lugar. Seja para otimizar sua carteira de ativos ou tomar decisões embasadas, estamos aqui para ajudar você a alcançar seus objetivos financeiros com segurança e confiança.
          </p>
        </section>

        <TopNews />

        <section className="quick-access">
          <h2>Acesso Rápido</h2>
          <div className="buttons">
            <a href="/busca" className="btn">Buscar Ativos</a>
            <a href="/carteira" className="btn">Ver Minha Carteira</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
