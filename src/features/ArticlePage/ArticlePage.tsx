import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { clearArticleData, fetchArticleById } from '../../store/newsSlice'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import classes from './ArticlePage.module.scss'
import { Preloader } from '../../components/Preloader/Preloader'
import { Image } from 'mui-image'
import { NavArrow } from '../../components/NavArrow/NavArrow'

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
