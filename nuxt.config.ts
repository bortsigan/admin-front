export default defineNuxtConfig({
  pages: true,

  experimental: {
    payloadExtraction: false
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {}, 
      autoprefixer: {},
    },
  },

  modules: [
    "@pinia/nuxt",
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'Minski Take - Home Exam',
      meta: [
        { name: 'description', content: 'Minski Take - Home Exam' }
      ]
    }
  },

  compatibilityDate: '2024-08-01'
});