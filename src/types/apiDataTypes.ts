export type DataType = {
  pagination: ReqPagination;
  data: RequestItem[];
};

type ReqPagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

type ImgType = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

interface TrailerImagesType extends ImgType {
  medium_image_url: string;
  maximum_image_url: string;
}

type TitlesType = {
  type: string;
  title: string;
};

type DateType = {
  day: number | null;
  month: number | null;
  year: number | null;
};

type CreatorsInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type RequestItem = {
  mal_id: number;
  url: string;
  images: {
    jpg: ImgType;
    webp: ImgType;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: TrailerImagesType;
  };
  approved: boolean;
  titles: TitlesType[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: null;
    prop: {
      from: DateType;
      to: DateType;
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: null;
  year: null;
  broadcast: {
    day: null;
    time: null;
    timezone: null;
    string: null;
  };
  producers: CreatorsInfo[];
  licensors: CreatorsInfo[];
  studios: CreatorsInfo[];
  genres: CreatorsInfo[];
  explicit_genres: [];
  themes: [];
  demographics: [];
};
