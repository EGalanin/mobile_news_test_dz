import { FC, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNews, loadPreviousMonth, fetchLatestNews } from '../../store/slices/newsSlice';
import { NewsCard } from '../NewsCard/NewsCard';
import styles from './NewsList.module.css';

const NewsList: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(state => state.news.articles);
  const isLoading = useAppSelector(state => state.news.isLoading);
  const hasMore = useAppSelector(state => state.news.hasMore);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    dispatch(fetchNews());

    const intervalId = setInterval(() => {
      dispatch(fetchLatestNews());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(loadPreviousMonth());
          dispatch(fetchNews());
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const groupedNews = useMemo(() => {
    return articles.reduce((groups: { [key: string]: typeof articles }, article) => {
      const date = new Date(article.publishDate).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(article);
      return groups;
    }, {});
  }, [articles]);

  const sortedGroups = useMemo(() => {
    return Object.entries(groupedNews).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  }, [groupedNews]);

  return (
    <div className={styles.container}>
      {sortedGroups.map(([date, newsItems], groupIndex, groupArray) => (
        <div
          key={date}
          className={styles.dateGroup}
          ref={groupIndex === groupArray.length - 1 ? lastArticleRef : null}
        >
          <h3 className={styles.dateHeader}>
            <span>News for</span>
            {date}
          </h3>
          {newsItems.map(item => (
            <NewsCard
              key={item.id}
              title={item.title}
              abstract={item.abstract}
              publishDate={item.publishDate}
              url={item.url}
              source={item.source}
              image={item.multimedia[0]}
            />
          ))}
        </div>
      ))}

      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.loaderDot}></div>
          <div className={styles.loaderDot}></div>
          <div className={styles.loaderDot}></div>
        </div>
      )}

      {!hasMore && <div className={styles.noMoreNews}>No more articles available</div>}
    </div>
  );
};

export default NewsList;
