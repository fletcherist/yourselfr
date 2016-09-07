var http, ip
if (__PROD__) {
  http = 'http://yoursel.fr'
  ip = 'http://185.18.54.156'
} else if (__DEV__) {
  ip = 'http://localhost:80'
  http = 'http://localhost:80'
}

http = 'http://yoursel.fr'
ip = 'http://185.18.54.156'
// http = 'https://yourselfr-api.herokuapp.com'
// ip = 'https://yourselfr-api.herokuapp.com'
// ip = 'http://localhost:5000'
// http = 'http://localhost:5000'

export const config = {
  http: http,
  ip: ip,
  post: 'application/x-www-form-urlencoded',
  googleAnalyticsId: 'UA-65570914-1'
}

export const palette = {
  yoColor: '#0088cc',
  yoColor2: '#0088cc',
  yoColor05: '#F2FDFF',
  yoGreen: '#4CAF50',
  black: '#999',
  white: '#ffffff',
  grey: '#777',
  greyBackground: '#fafbfc',
  backgroundColor: '#fafbfc',
  greyLight: '#E5E5E5'
}
