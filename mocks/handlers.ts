import mockAvatar from './data/profile.json'
import mockRecipes from './data/recipes.json'

import { rest } from 'msw'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const handlers = [
  rest.get(`${publicRuntimeConfig.CKF_PROFILE_API}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ userProfile: mockAvatar.data }))
  }),

  rest.get(`${publicRuntimeConfig.CKF_RECIPES_API}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ recipes: mockRecipes.recipes }))
  }),
]