import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.spaceflightnewsapi.net/v3/'
})

export const newsAPI = {
    getArticles () {
        return instance.get<ArticleType[]>('articles?_limit=60')
    }
}

export type ArticleType = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: LaunchType[] | [];
  events: EventType[] | [];
}
type LaunchType = {
    id: string
    provider: string
}
type EventType = {
    id: number
    provider: string
}