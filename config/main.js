/** General Configurations Like PORT, HOST names and etc... */

const config = {
  // This part goes to React-Helmet for Head of our HTML
  app: {
    head: {
      link: [
        {
          href: 'https://fonts.googleapis.com/css?family=Roboto',
          rel: 'stylesheet',
          type: 'text/css'
        }
      ],
      meta: [
        {charset: 'utf-8'},
        {'http-equiv': 'x-ua-compatible', content: 'ie=edge'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'description', content: 'React Redux Typescript'},
      ],
      title: 'Crazy Factory'
    }
  },
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8889,
  ssr: true,
  sentry: {
    dsn: '', // your sentry dsn here
    options: {}
  }
};

module.exports = config;
