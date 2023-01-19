import classes from './HomePage.module.scss'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Search } from '../../components/Search/Search'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { fetchArticles } from '../../store/newsSlice'
import { Preloader } from '../../components/Preloader/Preloader'
import { useSearch } from '../../common/hooks/useSearch'
import { useDebounce } from '../../common/hooks/useDebounce'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.news)
  const [search, setSearch] = useState('')
  const debouncedSearchValue = useDebounce(search)
  const articlesToRender = useSearch(debouncedSearchValue)

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
      <Search searchValue={search} getSearchValue={setSearch} />
      <Typography variant={'subtitle1'} component={'p'} gutterBottom className={classes.results}>
        Results: {articlesToRender.length}
      </Typography>
      <Divider />
      {articlesToRender.length > 0 ? (
        <Grid container spacing={3} className={classes.gridBlock}>
          {articlesToRender.map((article) => (
            <Grid item key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant={'h5'} component={'h3'} className={classes.noArticles}>
          There is no articles to show{search && ` by "${debouncedSearchValue}" keyword`}
        </Typography>
      )}
    </Container>
  )
}
