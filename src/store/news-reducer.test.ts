import {
  changeRequestStatus,
  clearArticleData,
  fetchArticleById,
  fetchArticles,
  NewsInitialStateType,
  newsReducer,
  resetError,
} from './newsSlice'
import { ArticleType } from '../api/news-api'

let state: NewsInitialStateType
let newArticles: ArticleType[]
let articleData: ArticleType

beforeEach(() => {
  state = {
    articles: [],
    article: {} as ArticleType,
    error: 'some error occurred',
    isLoading: false,
  }
  newArticles = [
    {
      id: 17906,
      title: 'Study: Space industry deploying more satellites that deliver sharper images',
      url: 'https://spacenews.com/study-space-industry-deploying-more-satellites-that-deliver-sharper-images/',
      imageUrl: 'https://spacenews.com/wp-content/uploads/2023/01/FmOIv3lakAEbT2j.jpeg',
      newsSite: 'SpaceNews',
      summary:
        'A new study by Quilty Analytics Quilty Analytics says the industry is witnessing a transformation in the domain of very high resolution imagery',
      publishedAt: '2023-01-16T19:12:18.000Z',
      updatedAt: '2023-01-16T19:12:18.757Z',
      featured: false,
      launches: [],
      events: [],
    },
    {
      id: 17905,
      title: 'NASA prepares next steps in development of future large space telescope',
      url: 'https://spacenews.com/nasa-prepares-next-steps-in-development-of-future-large-space-telescope/',
      imageUrl: 'https://spacenews.com/wp-content/uploads/2023/01/luvoirb.jpg',
      newsSite: 'SpaceNews',
      summary:
        'NASA is preparing to move into the next stage of planning for a future large space telescope that may take two decades to launch, building on lessons learned from past missions.',
      publishedAt: '2023-01-16T18:32:18.000Z',
      updatedAt: '2023-01-16T18:32:18.812Z',
      featured: false,
      launches: [],
      events: [],
    },
  ]
  articleData = {
    id: 17907,
    title:
      'Webb peers at young star’s dusty disk, discovers an exoplanet, and uncovers star formation',
    url: 'https://www.nasaspaceflight.com/2023/01/jwst-science-aas/',
    imageUrl:
      'https://www.nasaspaceflight.com/wp-content/uploads/2023/01/webb-aas-article-fina-1170x658.png',
    newsSite: 'NASASpaceflight',
    summary:
      'At the 241st meeting of the American Astronomical Society (AAS) on Jan. 11, three teams presented research that utilized the capabilities of NASA’s James Webb Space Telescope. The first team used Webb to observe the dusty disk surrounding a young red dwarf star, the second to discover an exoplanet, and the third used the telescope’s infrared sensitivity to uncover the mysterious star formation processes in an open star cluster.',
    publishedAt: '2023-01-16T21:00:56.000Z',
    updatedAt: '2023-01-16T21:02:27.433Z',
    featured: false,
    launches: [],
    events: [],
  }
})

test('article data should be cleared', () => {
  const newsReducerTest = newsReducer(state, clearArticleData())
  expect(newsReducerTest.article).toStrictEqual({})
})

test('error should be reset', () => {
  const newsReducerTest = newsReducer(state, resetError())
  expect(newsReducerTest.error).toBe(null)
})

test('request status should be changed', () => {
  const newsReducerTest = newsReducer(state, changeRequestStatus({ loading: true }))
  expect(newsReducerTest.isLoading).toBe(true)
})

test('articles should be set to the state', () => {
  const action = fetchArticles.fulfilled(newArticles, 'requestId', undefined)
  const newsReducerTest = newsReducer(state, action)
  expect(newsReducerTest.articles[0].id).toBe(17906)
  expect(newsReducerTest.articles[1].summary.length).toBe(103)
})

test('fetching articles should fail with the specified error message', () => {
  const action = fetchArticles.rejected(null, 'requestId', undefined, 'failed to retrieve articles')
  const newsReducerTest = newsReducer(state, action)
  expect(newsReducerTest.error).toBe('failed to retrieve articles')
})

test('article data should be set to the state', () => {
  const action = fetchArticleById.fulfilled(articleData, 'requestId', '17907')
  const newsReducerTest = newsReducer(state, action)
  expect(newsReducerTest.article.id).toBe(17907)
  expect(newsReducerTest.article.publishedAt).toBe('2023-01-16T21:00:56.000Z')
})

test('fetching article by id should fail with the specified error message', () => {
  const action = fetchArticleById.rejected(null, 'requestId', '17907', 'failed to get article data')
  const newsReducerTest = newsReducer(state, action)
  expect(newsReducerTest.error).toBe('failed to get article data')
})
