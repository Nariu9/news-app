import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { clearArticleData, fetchArticleById } from '../../app/newsSlice'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import classes from './ArticlePage.module.scss'
import { Preloader } from '../../common/components/Preloader/Preloader'
import { Image } from 'mui-image'
import { NavArrow } from '../../common/components/NavArrow/NavArrow'

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
      <Image src={article.imageUrl || 'https://t.ly/VuHn4'} height={'245px'} />
      <Container maxWidth={'lg'} className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h5' component='h3' className={classes.title}>
              {article.title ? article.title : 'Something went wrong, please try again later'}
            </Typography>
            <Typography variant='body1' component='p' className={classes.description}>
              {article.summary}
            </Typography>
          </CardContent>
        </Card>
        <NavArrow text='Back to homepage' to={'/'} goBack />
      </Container>
    </Box>
  )
}
