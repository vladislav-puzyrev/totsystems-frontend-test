import { type Folder } from '../slices/folderSlice'

export const FOLDERS: Folder[] = [
  {
    id: 1,
    name: 'Входящие',
    mailIds: [2, 4, 6, 8],
    custom: false
  },
  {
    id: 2,
    name: 'Отправленные',
    mailIds: [5],
    custom: false
  },
  {
    id: 3,
    name: 'Черновики',
    mailIds: [],
    custom: false
  },
  {
    id: 4,
    name: 'Удаленные',
    mailIds: [1, 7],
    custom: false
  },
  {
    id: 5,
    name: 'Спам',
    mailIds: [3, 9],
    custom: false
  }
]
