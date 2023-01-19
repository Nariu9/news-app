import { useMemo } from 'react'
import { useAppSelector } from './hooks'

export const useSearch = (searchValue: string) => {
  const articles = useAppSelector((state) => state.news.articles)

  return useMemo(() => {
    if (searchValue.trim() === '') {
      return articles
    }

    const searchRegex = new RegExp(searchValue, 'gi')

    const selectedArticles = articles.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchValue.toLowerCase())
    )

    const sortedSelectedArticles = selectedArticles
      .map((item) => ({
        ...item,
        titleMatches: item.title.match(searchRegex)?.length || 0,
        summaryMatches: item.summary.match(searchRegex)?.length || 0,
      }))
      .sort((a, b) => b.titleMatches - a.titleMatches || b.summaryMatches - a.summaryMatches)

    return sortedSelectedArticles.map((item) => {
      const newTitle = item.title.replace(
        searchRegex,
        (match) => `<mark style='background: yellow'>${match}</mark>`
      )
      const newSummary = item.summary.replace(
        searchRegex,
        (match) => `<mark style='background: yellow'>${match}</mark>`
      )
      return {
        ...item,
        title: newTitle,
        summary: newSummary,
      }
    })
  }, [searchValue, articles])
}
