import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {Link, useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import {clearArticleData, fetchArticleById} from '../../features/News/newsSlice';
import {Box, Card, CardContent, CardMedia, Container, Typography} from '@mui/material';
import classes from './ArticlePage.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const ArticlePage = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const article = useAppSelector(state => state.news.article)

    useEffect(() => {
        id && dispatch(fetchArticleById(id))

        return () => {
            dispatch(clearArticleData())
        }
    }, [id, dispatch])


    return (
        <Box className={classes.wrapper}>
            <CardMedia
                component="img"
                alt="article picture"
                height="245"
                image={article.imageUrl}
            />
            <Container maxWidth={'lg'} className={classes.container}>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h3" className={classes.title}>
                            {article.title}
                        </Typography>
                        <Typography variant="body1" component="p" className={classes.description}>
                            {article.summary}
                        </Typography>
                    </CardContent>
                </Card>
                <Link to={'/'} className={classes.link}><ArrowBackIcon className={classes.arrow}/> Back to homepage</Link>
            </Container>
        </Box>
    );
};