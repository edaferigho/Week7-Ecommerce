
const express = require('express')
const ProductRoute = require('./controller/product')
const UserRoute = require('./controller/user')



const app = express();

app.use('/products', ProductRoute)
app.use('/users',UserRoute)
//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('*', (req, res) => {
    res.status(500).send('Resource not found!')
})



app.listen(9000, () => {
    console.log('Ecommerce server is listening at 127.0.0.1:9000')

})

