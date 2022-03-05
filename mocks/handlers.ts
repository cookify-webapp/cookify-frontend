import mockAvatar from './data/profile.json'

import { rest } from 'msw'

export const handlers = [
  rest.get(`https://cookify-backend/api/profile`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ userProfile: mockAvatar.data }))
  }),
]