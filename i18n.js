module.exports = {
  locales: ['es', 'en', 'nl'], // Array with the languages that you want to use
  defaultLocale: 'es', // Default language of your website
  //logBuild: process.env.NODE_ENV !== 'production', // Logs the build process
  logBuild: false,
  pages: {
    '*': ['common'], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
    '/': ['home'],
    '/private/users': ['users'],
    '/table': ['table'],
  },
};