export type DataType = {
  pagination: RequestPagination;
  data: RequestItem[];
};

export type RequestItem = {
  mal_id: number;
  url: string;
  images: {
    jpg: ImgType;
    webp: ImgType;
  };
  trailer: {
    youtube_id: Nullable;
    url: Nullable;
    embed_url: Nullable;
    images: TrailerImagesType;
  };
  approved: boolean;
  titles: TitlesType[];
  title: string;
  title_english: Nullable;
  title_japanese: Nullable;
  title_synonyms: string[];
  type: Nullable<AnimeType>;
  source: Nullable;
  episodes: Nullable<number>;
  status: Nullable<AiringStatus>;
  airing: boolean;
  aired: {
    from: Nullable;
    to: Nullable;
    prop: {
      from: DateType;
      to: DateType;
    };
    string: Nullable;
  };
  duration: Nullable;
  rating: Nullable<AnimeRating>;
  score: Nullable<number>;
  scored_by: Nullable<number>;
  rank: Nullable<number>;
  popularity: Nullable<number>;
  members: Nullable<number>;
  favorites: Nullable<number>;
  synopsis: Nullable;
  background: Nullable;
  season: Nullable<Season>;
  year: Nullable<number>;
  broadcast: {
    day: Nullable;
    time: Nullable;
    timezone: Nullable;
    string: Nullable;
  };
  producers: CreatorsInfo[];
  licensors: CreatorsInfo[];
  studios: CreatorsInfo[];
  genres: CreatorsInfo[];
  explicit_genres: CreatorsInfo[];
  themes: CreatorsInfo[];
  demographics: CreatorsInfo[];
};

export type Nullable<T = string> = T | null;

export type RequestPagination = {
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
  image_url: Nullable;
  small_image_url: Nullable;
  large_image_url: Nullable;
};

interface TrailerImagesType extends ImgType {
  medium_image_url: Nullable;
  maximum_image_url: Nullable;
}

type TitlesType = {
  type: string;
  title: string;
};

type DateType = {
  day: Nullable<number>;
  month: Nullable<number>;
  year: Nullable<number>;
};

type CreatorsInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export enum AnimeType {
  tv = 'TV',
  ova = 'OVA',
  movie = 'Movie',
  special = 'Special',
  ona = 'ONA',
  music = 'Music',
}

export enum AiringStatus {
  finished = 'Finished Airing',
  currently = 'Currently Airing',
  notYet = 'Not yet aired',
}

export enum AnimeRating {
  G = 'G - All Ages',
  PG = 'PG - Children',
  PG13 = 'PG-13 - Teens 13 or older',
  R = 'R - 17+ (violence & profanity)',
  Rp = 'R+ - Mild Nudity',
  Rx = 'Rx - Hentai',
}

export enum Season {
  summer = 'summer',
  winter = 'winter',
  spring = 'spring',
  fall = 'fall',
}
