import React, {FC} from 'react';
import {ArticleType} from '../../api/news-api';
import {formatDate} from '../../common/utils/formatDate';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import classes from './ArticleCard.module.scss';
import {Link} from 'react-router-dom';

type ArticleCardType = {
    article: ArticleType
}

export const ArticleCard: FC<ArticleCardType> = ({article}) => {
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt="article picture"
                height="200"
                image={article.imageUrl}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="subtitle2" component="time" className={classes.dateBlock}>
                    <CalendarTodayOutlinedIcon className={classes.calendar}/> {formatDate(article.publishedAt)}
                </Typography>
                <Typography variant="h5" component="h3">
                    {article.title}
                </Typography>
                <Typography variant="subtitle1" component="p" className={classes.description}>
                    {article.summary.length > 100
                        ? `${article.summary.substring(0, 100)}...`
                        : article.summary}
                </Typography>
                <Link to={`article/${article.id}`} className={classes.link}>Read more <ArrowForwardIcon className={classes.arrow}/></Link>
            </CardContent>
        </Card>
    )
}