import { memo, useCallback } from 'react';
import styles from './NewsCard.module.css';
import { LazyImage } from '../LazyImage/LazyImage';

type NewsCardProps = {
  title: string;
  abstract: string;
  publishDate: string;
  url: string;
  source?: string;
  image?: {
    url: string;
    type: string;
  };
};

export const NewsCard = memo<NewsCardProps>(
  ({ title, abstract, publishDate, url, source = 'NY Times', image }) => {
    const handleClick = useCallback(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, [url]);

    return (
      <article className={styles.card} onClick={handleClick}>
        <div className={styles.label}>{source}</div>
        <div className={styles.wrapper}>
          {image && (
            <div className={styles.imageContainer}>
              <LazyImage src={image.url} alt={title} className={styles.image} />
            </div>
          )}

          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.abstract}>{abstract}</p>
            <time className={styles.date}>
              {new Date(publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              {new Date(publishDate).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </time>
          </div>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.abstract === nextProps.abstract &&
      prevProps.publishDate === nextProps.publishDate &&
      prevProps.url === nextProps.url &&
      prevProps.source === nextProps.source &&
      JSON.stringify(prevProps.image) === JSON.stringify(nextProps.image)
    );
  }
);
