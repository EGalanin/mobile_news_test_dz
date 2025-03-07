// NY Times API types
export type NYTimesMultimedia = {
  type: string;
  subtype: string;
  url: string;
};

export type NYTimesArticle = {
  _id: string;
  abstract: string;
  web_url: string;
  pub_date: string;
  source: string;
  headline: {
    main: string;
  };
  multimedia?: NYTimesMultimedia[];
};

export type NYTimesResponse = {
  response: {
    docs: NYTimesArticle[];
  };
};

// App types
export type Article = {
  id: string;
  title: string;
  abstract: string;
  url: string;
  publishDate: string;
  source: string;
  multimedia: Array<{
    url: string;
    type: string;
  }>;
};

export type NewsState = {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  lastUpdate: string | null;
  currentDate: {
    year: number;
    month: number;
  };
  hasMore: boolean;
};
