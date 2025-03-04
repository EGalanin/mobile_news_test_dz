import { FC } from 'react';
import styles from './Footer.module.css';

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

export const Footer: FC = () => {
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
      <p className={styles.copyright}>© 2023 Besider. Inspired by Insider</p>
    </footer>
  );
};
