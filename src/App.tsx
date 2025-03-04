import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { NewsList } from './components/NewsList/NewsList';
import './App.css';
import {Footer} from "./components/Footer/Footer.tsx";

// Временные моковые данные для демонстрации
const mockNews = [
  {
    id: '1',
    title: 'SpaceX Successfully Launches Starship',
    abstract: 'The world most powerful rocket completed its first full test flight.',
    publishDate: new Date().toISOString(),
    imageUrl: 'https://picsum.photos/800/400',
    url: 'https://www.nytimes.com/article/1'
  },
  {
    id: '2',
    title: 'New AI Breakthrough in Medical Research',
    abstract: 'Researchers have developed an AI system capable of predicting drug interactions.',
    publishDate: new Date(Date.now() - 86400000).toISOString(), // вчера
    imageUrl: 'https://picsum.photos/800/400',
    url: 'https://www.nytimes.com/article/2'
  }
];

function App() {
  const [news, setNews] = useState(mockNews);
  const [isLoading, setIsLoading] = useState(false);

  // Имитация подгрузки новых новостей каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      const newArticle = {
        id: Date.now().toString(),
        title: 'Breaking News ' + new Date().toLocaleTimeString(),
        abstract: 'Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours',
        publishDate: new Date().toISOString(),
        imageUrl: 'https://picsum.photos/800/400',
        url: 'https://www.nytimes.com/article/' + Date.now()
      };
      setNews(prev => [newArticle, ...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Имитация загрузки старых новостей
    setTimeout(() => {
      const oldArticle = {
        id: Date.now().toString(),
        title: 'Older News Article',
        abstract: 'Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours',
        publishDate: new Date(Date.now() - 172800000).toISOString(), // 2 дня назад
        imageUrl: 'https://picsum.photos/800/400',
        url: 'https://www.nytimes.com/article/' + Date.now()
      };
      setNews(prev => [...prev, oldArticle]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="app">
      <Header />
      <div className="content">
        <NewsList 
          news={news}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
        />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
