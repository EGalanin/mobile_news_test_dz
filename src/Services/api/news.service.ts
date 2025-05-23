import { API_KEY } from '../../config/api.config';
import { Article, NYTimesResponse, NYTimesArticle } from '../../types/news.types';

const transformArticle = (doc: NYTimesArticle): Article => {
  const image = doc.multimedia?.find(
    media =>
      media.type === 'image' && (media.subtype === 'articleLarge' || media.subtype === 'superJumbo')
  );

  return {
    id: doc._id,
    title: doc.headline.main,
    abstract: doc.abstract,
    url: doc.web_url,
    publishDate: doc.pub_date,
    source: doc.source,
    multimedia: image
      ? [
          {
            url: `https://static01.nyt.com/${image.url}`,
            type: image.type,
          },
        ]
      : [],
  };
};

export const newsService = {
  async getArchiveNews(year: number = 2023, month: number = 11, signal?: AbortSignal) {
    try {
      const response = await fetch(`/api/archive/v1/${year}/${month}.json?api-key=${API_KEY}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = (await response.json()) as NYTimesResponse;
      return data.response.docs.map(transformArticle);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return [];
      }
      throw error instanceof Error ? error : new Error('Failed to fetch news');
    }
  },
};
