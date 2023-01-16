import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { clearArticleData, fetchArticleById } from '../../features/News/newsSlice'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import classes from './ArticlePage.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Preloader } from '../../common/components/Preloader/Preloader'
import { Image } from 'mui-image'

export const ArticlePage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { article, isLoading } = useAppSelector((state) => state.news)

  useEffect(() => {
    id && dispatch(fetchArticleById(id))

    return () => {
      dispatch(clearArticleData())
    }
  }, [id, dispatch])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <Box className={classes.wrapper}>
      <Image src={article.imageUrl} height={'245px'} />
      <Container maxWidth={'lg'} className={classes.container}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography variant='h5' component='h3' className={classes.title}>
              {article.title ? article.title : 'Something went wrong, please try again later'}
            </Typography>
            <Typography variant='body1' component='p' className={classes.description}>
              {article.summary}
            </Typography>
          </CardContent>
        </Card>
        <Link to={'/'} className={classes.link}>
          <ArrowBackIcon className={classes.arrow} /> Back to homepage
        </Link>
      </Container>
    </Box>
  )
}
