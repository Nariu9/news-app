import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleType, newsAPI } from '../api/news-api'
import { AxiosError } from 'axios'

export const fetchArticles = createAsyncThunk<ArticleType[], undefined, { rejectValue: string }>(
  'news/fetchArticles',
  async (arg, { rejectWithValue, dispatch }) => {
    dispatch(changeRequestStatus({ loading: true }))
    try {
      const res = await newsAPI.getArticles()
      return res.data
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    } finally {
      dispatch(changeRequestStatus({ loading: false }))
    }
  }
)

export const fetchArticleById = createAsyncThunk<ArticleType, string, { rejectValue: string }>(
  'news/fetchArticleById',
  async (articleId, { rejectWithValue, dispatch }) => {
    dispatch(changeRequestStatus({ loading: true }))
    try {
      const res = await newsAPI.getArticle(articleId)
      return res.data
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    } finally {
      dispatch(changeRequestStatus({ loading: false }))
    }
  }
)

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [] as ArticleType[],
    article: {} as ArticleType,
    error: null as null | string,
    isLoading: false,
  },
  reducers: {
    clearArticleData: (state) => {
      state.article = {} as ArticleType
    },
    resetError: (state) => {
      state.error = null
    },
    changeRequestStatus: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.isLoading = action.payload.loading
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.map((article) =>
          article.summary.length > 100
            ? {
                ...article,
                summary: `${article.summary.substring(0, 100)}...`,
              }
            : article
        )
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        if (action.payload) state.error = action.payload
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.article = action.payload
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        if (action.payload) state.error = action.payload
      })
  },
})

export type NewsInitialStateType = ReturnType<typeof newsSlice.getInitialState>
export const { clearArticleData, resetError, changeRequestStatus } = newsSlice.actions
export const newsReducer = newsSlice.reducer
