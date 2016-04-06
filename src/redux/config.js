// var http = 'http://localhost:80';
var http = 'http://yourselfr.com';

// var http = process.env.NODE_ENV === 'development' ? 'http://localhost:80' : 'http://yourselfr.com';
// if (__PROD__) {
  // http = 'http://yourselfr.com'
// }
export const config = {
  http: http,
  post: 'application/x-www-form-urlencoded',
  googleAnalyticsId: 'UA-65570914-1'
}
