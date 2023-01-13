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

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [] as ArticleType[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles = action.payload
            })
    }
})

export const newsReducer = newsSlice.reducer