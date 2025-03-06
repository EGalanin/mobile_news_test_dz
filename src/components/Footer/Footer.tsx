import { FC } from 'react';
import styles from './Footer.module.css';
import newsApi from "../../assets/newsApi.png";

type FooterLink = {
  title: string;
  url: string;
};

type FooterGroup = {
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    links: [
      { title: 'Log In', url: '/login' },
      { title: 'About Us', url: '/about' },
      { title: 'Publishers', url: '/publishers' },
      { title: 'Sitemap', url: '/sitemap' },
    ]
  }
];

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.navigation}>
        {footerGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.group}>
            {group.links.map((link, ) => (
                <a 
                  key={link.url} 
                  href={link.url} 
                  className={styles.link}
                >
                  {link.title}
                </a>
            ))}
          </div>
        ))}
      </nav>
      <div className={styles.wrapper}>
        <span className={styles.divider}>Powered by</span>
        <div className={styles.imageContainer}>
          <img src={newsApi} alt={'news-api'} className={styles.image} />
        </div>
      </div>

      <p className={styles.copyright}>© 2023 Besider. Inspired by Insider</p>
    </footer>
  );
};

export default Footer;
