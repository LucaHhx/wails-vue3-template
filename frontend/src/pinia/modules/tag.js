import { getSlotSymbolList } from '@/api/slotSymbol'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tag', () => {
  let tagList = []

  const setTagMap = (tagRes) => {
    tagList = tagRes
  }

  const getTags = async() => {
    if (tagList && tagList.length > 0) {
      return tagList
    } else {
      const res = await getSlotSymbolList()
      if (res.code === 0) {
        const list = res.data.list
        const tags = []
        list && list.forEach(item => {
          tags[item.ID] = item.name
        })
        setTagMap(tags)
        return tagList
      }
    }
  }

  return {
    tagList,
    setTagMap,
    getTags
  }
})
