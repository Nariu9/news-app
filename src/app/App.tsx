import React from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { HomePage } from '../features/HomePage/HomePage'
import { ArticlePage } from '../features/ArticlePage/ArticlePage'
import { Root } from '../components/Root/Root'
import { PageNotFound } from '../features/PageNotFound/PageNotFound'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path={'/articles/:id'} element={<ArticlePage />} />
      <Route path={'/404'} element={<PageNotFound />} />
      <Route path={'*'} element={<Navigate to={'/404'} />} />
    </Route>
  )
)

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    allVariants: {
      color: '#363636',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorSnackbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
