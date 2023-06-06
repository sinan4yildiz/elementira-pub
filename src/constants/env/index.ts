const env = {
   public: {
      APP_URL: process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL,
      CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL
   },
   private: {
      APP_HOST: process.env.APP_HOST,
      APP_PORT: process.env.APP_PORT,
      APP_CACHE: process.env.APP_CACHE,
      APP_ENV: process.env.APP_ENV || process.env.NODE_ENV,

      SERVER_REQUEST_TIMEOUT: parseInt(process.env.SERVER_REQUEST_TIMEOUT as string),

      MONGODB_URI: process.env.MONGODB_URI,

      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

      FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

      SCRAPER_API_KEY: process.env.SCRAPER_API_KEY,
      SCRAPING_BEE_API_KEY: process.env.SCRAPING_BEE_API_KEY,

      BRIGHT_DATA_CENTER_URL: process.env.BRIGHT_DATA_CENTER_URL,
      BRIGHT_DATA_UNLOCKER_URL: process.env.BRIGHT_DATA_UNLOCKER_URL,

      PIXABAY_API_KEY: process.env.PIXABAY_API_KEY,
      PEXELS_API_KEY: process.env.PEXELS_API_KEY,
      VIDEVO_API_KEY: process.env.VIDEVO_API_KEY,
      DEPOSITPHOTOS_API_KEY: process.env.DEPOSITPHOTOS_API_KEY,

      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SSL: process.env.SMTP_SSL,
      SMTP_USERNAME: process.env.SMTP_USERNAME,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD,
      SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
      SMTP_FROM_ADDRESS: process.env.SMTP_FROM_ADDRESS
   }
}

export default env
