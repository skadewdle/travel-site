exports.handler = (event, context, callback) => {
  callback (null, {
    statusCode: 200,
    body: 'Welcome to the super sercet area'
  })
}