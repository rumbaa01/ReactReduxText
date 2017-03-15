var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = require('./server/utils/DataBaseUtils');

var app = new (require('express'))()
var port = 3000;
var compiler = webpack(config);

db.setUpConnection();
db.initDBWithText();
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use( bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get("/paragraphs", function(req, res){
  var dataForSend = {};
  db.listParagraph().then(function(data){
    dataForSend.paragraphs = data;
      db.listTag().then(function(data){
        dataForSend.tags = data;
        res.send(dataForSend);
      });
  });
});

app.post('/tags', function(req, res){
    db.createTag(req.body).then(function(data){
      res.send(data);
    });
});

app.delete('/tags/:id', function(req, res){
    db.deleteTag(req.params.id).then(function(data){
      res.send(data)
    });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
