import { FC, useState } from 'react';
import styles from './Header.module.css';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.headerContent}>
        <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)} aria-label="Menu">
          <span className={styles.menuIcon}></span>
        </button>
        <h1 className={styles.title}>BESIDER</h1>
      </div>

      {isMenuOpen && (
        <div className={styles.menuContainer}>
          <button
            className={styles.closeButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <a href="#sciense">SCIENCE</a>
              </li>
              <li>
                <a href="#general">GENERAL</a>
              </li>
              <li>
                <a href="#entertaiment">ENTERTAINMENT</a>
              </li>
              <li>
                <a href="#technology">TECHNOLOGY</a>
              </li>
              <li>
                <a href="#business">BUSINESS</a>
              </li>
              <li>
                <a href="#health">HEALTH</a>
              </li>
              <li>
                <a href="#sports">SPORTS</a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
