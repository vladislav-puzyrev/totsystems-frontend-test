import { type Mail } from '../slices/mailSlice'

export const MAILS: Mail[] = [
  {
    id: 1,
    author: 'Петя',
    subject: 'Long message',
    message: ' Test '.repeat(10000).trim(),
    createdDate: '2023-03-31T14:57:56.720Z',
    readDate: null
  },
  {
    id: 2,
    author: 'Вася',
    subject: 'Без темы',
    message: 'Привет',
    createdDate: '2023-03-30T14:57:56.720Z',
    readDate: '2023-04-01T09:51:27.194Z'
  },
  {
    id: 3,
    author: 'cjzixjs',
    subject: 'Поздравляем',
    message: 'Вы победили в гос лото!',
    createdDate: '2023-03-29T14:57:56.720Z',
    readDate: null
  },
  {
    id: 4,
    author: 'Оля',
    subject: 'Test',
    message: 'Как дела',
    createdDate: '2023-03-28T14:57:56.720Z',
    readDate: null
  },
  {
    id: 5,
    author: 'Я',
    subject: 'Long Message',
    message: ' Test '.repeat(1000).trim(),
    createdDate: '2023-03-27T14:57:56.720Z',
    readDate: null
  },
  {
    id: 6,
    author: 'Света',
    subject: 'Без темы',
    message: '😄😄',
    createdDate: '2023-03-26T14:57:56.720Z',
    readDate: null
  },
  {
    id: 7,
    author: '3123123',
    subject: 'Без темы',
    message: 'zxczxczxc',
    createdDate: '2023-03-26T14:57:56.720Z',
    readDate: null
  },
  {
    id: 8,
    author: '3123123123',
    subject: 'Без темы',
    message: 'dsadsdasd',
    createdDate: '2023-03-26T14:57:56.720Z',
    readDate: null
  },
  {
    id: 9,
    author: '312312222',
    subject: 'Без темы',
    message: 'eqweqweqwe😄',
    createdDate: '2023-03-26T14:57:56.720Z',
    readDate: null
  }
]
