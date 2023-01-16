import classes from './HomePage.module.scss'
import { Container, Divider, Grid, Typography } from '@mui/material'
import { Search } from '../../features/Search/Search'
import { ArticleCard } from '../../features/ArticleCard/ArticleCard'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { fetchArticles } from '../../features/News/newsSlice'
import { Preloader } from '../../common/components/Preloader/Preloader'
import { type ArticleType } from '../../api/news-api'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const { articles, isLoading } = useAppSelector((state) => state.news)
  const articlesNumber = articles.length
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState<ArticleType[]>([])

  const getSearchValueHandler = (searchValue: string) => {
    setSearch(searchValue)
    const newArr = articles
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.summary.includes(searchValue.toLowerCase())
      )
      .map((item) => {
        const newTitle = item.title.replace(
          new RegExp(searchValue, 'gi'),
          (match) => `<mark style="background: yellow">${match}</mark>`
        )
        const newSummary = item.summary.replace(
          new RegExp(searchValue, 'gi'),
          (match) => `<mark style="background: yellow">${match}</mark>`
        )
        return {
          ...item,
          title: newTitle,
          summary: newSummary,
        }
      })
    setSearchData(newArr)
  }

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <Container maxWidth={'lg'} className={classes.container}>
      <Typography variant={'subtitle1'} component={'h3'} className={classes.searchTitle}>
        Filter by keywords
      </Typography>
      <Search searchValue={search} getSearchValue={getSearchValueHandler} />
      {articlesNumber > 0 ? (
        <Typography variant={'subtitle1'} component={'p'} gutterBottom className={classes.results}>
          {articlesNumber > 1 || searchData.length > 1 ? 'Results' : 'Result'}:{' '}
          {search.length > 0 ? searchData.length : articles.length}
        </Typography>
      ) : (
        <Typography variant={'subtitle1'} component={'p'} gutterBottom className={classes.results}>
          Results: 0
        </Typography>
      )}
      <Divider />
      {search.length > 0 && searchData.length > 0 ? (
        <Grid container spacing={3} className={classes.gridBlock}>
          {searchData.map((article) => (
            <Grid item key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      ) : articles.length > 0 ? (
        <Grid container spacing={3} className={classes.gridBlock}>
          {articles.map((article) => (
            <Grid item key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant={'h5'} component={'h3'} className={classes.noArticles}>
          There is no articles to show
        </Typography>
      )}
    </Container>
  )
}
