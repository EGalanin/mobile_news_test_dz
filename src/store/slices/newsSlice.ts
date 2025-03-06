import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NewsState } from '../../types/news.types'
import { newsService } from '../../Services/api/news.service'

const getCurrentDate = () => {
    const date = new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }
}

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { getState }) => {
        const state = getState() as { news: NewsState }
        const { year, month } = state.news.currentDate
        return await newsService.getArchiveNews(year, month)
    }
)

export const fetchLatestNews = createAsyncThunk(
    'news/fetchLatestNews',
    async (_, { getState }) => {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        return await newsService.getArchiveNews(year, month)
    }
)

const initialState: NewsState = {
    articles: [],
    isLoading: false,
    error: null,
    lastUpdate: null,
    currentDate: getCurrentDate(),
    hasMore: true
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        loadPreviousMonth: (state) => {
            let { year, month } = state.currentDate
            month--
            if (month < 1) {
                month = 12
                year--
            }
            state.currentDate = { year, month }            
            state.hasMore = !(year === 2000 && month === 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchNews.fulfilled, (state, action) => {              
                const existingIds = new Set(state.articles.map(article => article.id))               
                
                const newArticles = action.payload.filter(article => !existingIds.has(article.id))
                
                state.articles = [...state.articles, ...newArticles]
                state.isLoading = false
                state.lastUpdate = new Date().toISOString()
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to fetch news'
            })            
            .addCase(fetchLatestNews.fulfilled, (state, action) => {
                const existingIds = new Set(state.articles.map(article => article.id))
                const newArticles = action.payload.filter(article => !existingIds.has(article.id))
                
                if (newArticles.length > 0) {
                    state.articles = [...newArticles, ...state.articles]
                    state.lastUpdate = new Date().toISOString()
                }
            })
    }
})

export const { loadPreviousMonth } = newsSlice.actions

export default newsSlice.reducer