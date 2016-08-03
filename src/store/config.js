if (__PROD__) {
  var http = 'http://yoursel.fr'
  var ip = 'http://185.18.54.156'
} else if (__DEV__) {
  var ip = 'http://localhost:80'
  var http = 'http://localhost:80'
}

var http = 'http://yoursel.fr'
var ip = 'http://185.18.54.156'

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
