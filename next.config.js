const moduleExports = {
  publicRuntimeConfig: {
    CKF_API: process.env.CKF_API,
    CKF_INGREDIENT_API: process.env.CKF_INGREDIENT_API
  },
  experimental: {
    outputStandalone: true,
  },
}

module.exports = moduleExports
