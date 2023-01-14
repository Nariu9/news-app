import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ArticleType, newsAPI} from '../../api/news-api';


export const fetchArticles = createAsyncThunk('news/fetchArticles', async (arg, {rejectWithValue})=> {
    try {
        const res = await newsAPI.getArticles()
        return res.data
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const fetchArticleById = createAsyncThunk('news/fetchArticleById', async (articleId: string, {rejectWithValue})=> {
    try {
        const res = await newsAPI.getArticle(articleId)
        return res.data
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [] as ArticleType[],
        article: {} as ArticleType
    },
    reducers: {
        clearArticleData:(state) => {
            state.article = {} as ArticleType
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles = action.payload
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.article = action.payload
            })
    }
})


export  const {clearArticleData} = newsSlice.actions
export const newsReducer = newsSlice.reducer