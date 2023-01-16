import { type FC } from 'react'
import { type ArticleType } from '../../api/news-api'
import { formatDate } from '../../common/utils/formatDate'
import { Card, CardContent, Typography } from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import classes from './ArticleCard.module.scss'
import { Image } from 'mui-image'
import { NavArrow } from '../../common/components/NavArrow/NavArrow'

type ArticleCardType = {
  article: ArticleType
}

export const ArticleCard: FC<ArticleCardType> = ({ article }) => (
  <Card className={classes.card}>
    <Image src={article.imageUrl} height={'200px'} />
    <CardContent className={classes.cardContent}>
      <Typography variant='subtitle2' component='time' className={classes.dateBlock}>
        <CalendarTodayOutlinedIcon className={classes.calendar} /> {formatDate(article.publishedAt)}
      </Typography>
      <Typography variant='h5' component='h3' dangerouslySetInnerHTML={{ __html: article.title }} />
      <Typography
        variant='subtitle1'
        component='p'
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: article.summary }}
      />
      <NavArrow text={'Read more'} to={`articles/${article.id}`} goBack={false} />
    </CardContent>
  </Card>
)
