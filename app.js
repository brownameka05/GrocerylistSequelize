const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')

const models = require('./models')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")


let shoppinglist = models.shoppinglist.build({
  name: 'Walmart',
  street: '1200 brown st',
  city: 'Houston',
  state: 'Texas'
})

shoppinglist.save().then(function(newList){
  console.log(newList)
})


app.get('/home',function(req,res){
  models.shoppinglist.findAll().then(function(shoppinglists){
    res.render('home',{lists : shoppinglists})
  })
})


app.listen(3000,function(req,res){
  console.log("Grocery List server running... ")
})
