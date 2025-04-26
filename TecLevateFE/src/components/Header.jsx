
import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>TecLevate</div>
      <nav style={styles.nav}>
        <a href="#home" style={styles.link}>Inicio</a>
        <a href="#about" style={styles.link}>Sobre Nosotros</a>
        <a href="#contact" style={styles.link}>Contacto</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#0d6efd',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Header;
