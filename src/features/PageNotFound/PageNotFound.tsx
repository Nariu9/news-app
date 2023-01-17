import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import classes from './PageNotFound.module.scss'
import { NavArrow } from '../../components/NavArrow/NavArrow'
import React from 'react'

export const PageNotFound = () => (
  <Container maxWidth={'lg'} sx={{ display: 'flex' }} className={classes.container}>
    <Typography variant={'h4'} component={'h2'} gutterBottom>
      Sorry, this page is not available
    </Typography>
    <Typography variant={'h5'} component={'p'} className={classes.subtitle}>
      Please, go back and try something else
      <Typography component={'span'} className={classes.emoji}>
        👨‍🚀🚀
      </Typography>
    </Typography>
    <NavArrow text='Back to homepage' to={'/'} goBack />
  </Container>
)
