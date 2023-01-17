import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import classes from './Preloader.module.scss'

export const Preloader = () => {
  return (
    <Box className={classes.wrapper}>
      <CircularProgress color={'inherit'} />
    </Box>
  )
}
