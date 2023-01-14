import classes from './HomePage.module.scss';
import {Container, Divider, Grid, Typography} from '@mui/material';
import {Search} from '../../features/Search/Search';
import {ArticleCard} from '../../features/ArticleCard/ArticleCard';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {fetchArticles} from '../../features/News/newsSlice';

export const HomePage = () => {

    const dispatch = useAppDispatch()
    const articles = useAppSelector(state => state.news.articles)
    const articlesNumber = articles.length


    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch])

    return (
        <Container maxWidth={'lg'} className={classes.container}>
            <Typography variant={'subtitle1'} component={'h3'} className={classes.searchTitle}>Filter by keywords</Typography>
            <Search/>
            {articlesNumber > 0
                ? <Typography variant={'subtitle1'} component={'p'}
                              gutterBottom className={classes.results}>{articlesNumber > 1 ? 'Results' : 'Result'}: {articlesNumber}</Typography>
                : <Typography variant={'subtitle1'} component={'p'}
                              gutterBottom className={classes.results}>Results: 0</Typography>}
            <Divider/>
            <Grid container spacing={3} className={classes.gridBlock}>
                {articles.map(article =>
                    <Grid item key={article.id}>
                        <ArticleCard
                            article={article}/>
                    </Grid>)}
            </Grid>
        </Container>
    );
}