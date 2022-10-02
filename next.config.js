const moduleExports = {
  publicRuntimeConfig: {
    CKF_API: process.env.CKF_API,
    CKF_IMAGE_API: process.env.CKF_IMAGE_API,
    CKF_INGREDIENT_API: process.env.CKF_INGREDIENT_API,
    CKF_RECIPE_API: process.env.CKF_RECIPE_API,
    CKF_COMMENT_API: process.env.CKF_COMMENT_API,
    CKF_ACCOUNT_API: process.env.CKF_ACCOUNT_API,
    CKF_SNAPSHOT_API: process.env.CKF_SNAPSHOT_API,
    CKF_NOTIFICATION_API: process.env.CKF_NOTIFICATION_API,
    CKF_COMPLAINT_API: process.env.CKF_COMPLAINT_API
  },
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: [
      'cookifywebapp-dev.sit.kmutt.ac.th',
      'cookifywebapp.sit.kmutt.ac.th',
      'firebasestorage.googleapis.com'
    ],
  },
}

module.exports = moduleExports
