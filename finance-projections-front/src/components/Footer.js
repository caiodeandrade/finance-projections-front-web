import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section footer__about">
          <h3>Sobre</h3>
          <p>
            O Finance Projections é uma plataforma para acompanhamento de investimentos, oferecendo projeções detalhadas e análises financeiras para ajudar você a tomar decisões informadas.
          </p>
        </div>
        <div className="footer__section footer__links">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
        </div>
        <div className="footer__section footer__social">
          <h3>Redes Sociais</h3>
          <a href="https://www.facebook.com" className="footer__icon">Facebook</a>
          <a href="https://www.twitter.com" className="footer__icon">Twitter</a>
          <a href="https://www.instagram.com" className="footer__icon">Instagram</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Finance Projections. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
