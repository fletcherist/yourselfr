// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default function applyExpressMiddleware (fn, req, res) {
  const originalEnd = res.end

<<<<<<< HEAD
  return new Promise((resolve) => {
=======
  return new Promise((resolve, reject) => {
>>>>>>> origin/master
    res.end = function () {
      originalEnd.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, function () {
      resolve(true)
    })
  })
}
