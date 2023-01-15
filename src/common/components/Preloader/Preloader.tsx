import {Box, CircularProgress} from '@mui/material';
import classes from './Preloader.module.scss'

export const Preloader = () => {
    return (
        <Box className={classes.wrapper}>
            <CircularProgress color={'inherit'}/>
        </Box>
    );
}