const moduleExports = {
  publicRuntimeConfig: {
    CKF_API: process.env.CKF_API,
    CKF_IMAGE_API: process.env.CKF_IMAGE_API,
    CKF_INGREDIENT_API: process.env.CKF_INGREDIENT_API,
    CKF_RECIPE_API: process.env.CKF_RECIPE_API
  },
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: [
      'cookifywebapp-dev.sit.kmutt.ac.th',
      'cookifywebapp.sit.kmutt.ac.th'
    ],
  },
}

module.exports = moduleExports
