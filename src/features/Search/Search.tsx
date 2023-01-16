import classes from './Search.module.scss'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { type ChangeEvent, type FC } from 'react'

type SearchType = {
  searchValue: string
  getSearchValue: (searchValue: string) => void
}

export const Search: FC<SearchType> = ({ searchValue, getSearchValue }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    getSearchValue(e.currentTarget.value)
  }

  return (
    <Paper component={'div'} className={classes.searchBlock}>
      <IconButton sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        value={searchValue}
        placeholder={'Enter your search term...'}
        onChange={onChangeHandler}
        className={classes.searchInput}
      />
    </Paper>
  )
}
