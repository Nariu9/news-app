import { FC } from 'react'
import classes from './NavArrow.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

type NavArrowType = {
  text: string
  to: string
  goBack: boolean
}

export const NavArrow: FC<NavArrowType> = ({ text, to, goBack }) => {
  return (
    <Link to={to} className={classes.link}>
      {goBack ? (
        <>
          <ArrowBackIcon className={classes.arrowBack} /> {text}{' '}
        </>
      ) : (
        <>
          {text}
          <ArrowForwardIcon className={classes.arrowForward} />
        </>
      )}
    </Link>
  )
}
