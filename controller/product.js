const express = require('express');
const Products = require('../model/Products')




const Router = express.Router();


Router.get('/', (request, response) => {
    response.json(Products)
})
Router.post('/', (request, response) => {
    let dataBody = request.body
    let product = { id: getId(),name:dataBody.name, description:dataBody.description,image:dataBody.image, price:dataBody.price }
   
    Products.push(product)
    response.json(Products)

})
Router.put('/:id', (request, response) => {
    reqID = request.params.id
    let found = Products.find((product) => {
        return product.id=== Number(reqID)
    })
    if (!found) {
        response.send("Product record not found")
    }
    else {
        // find the index of the product
        let index = Products.indexOf(found)
        reqBody = request.body
        if (typeof reqBody.name!==undefined) {
            found.name = reqBody.name
        }
        if (reqBody.description!==undefined) {
            found.description=reqBody.description
        }
         if (reqBody.image!==undefined) {
            found.image=reqBody.image
        }
         if (reqBody.price!==undefined) {
            found.price=reqBody.price
        }
        Products[index] = found
        response.json(Products)

    }
    
})
    Router.delete('/:id', (request, response) => {
    reqID = request.params.id
    let found = Products.find((product) => {
        return product.id=== Number(reqID)
    })
    if (!found) {
        response.send("Product record not found")
    }
    else {
        let index = Products.indexOf(found)
        Products.splice(index,1)
        
        response.send(Products)
    }
    })

    // Function to generate User ID
function generateID() {
    let count = 0
    return () => {
        count++
        return count
    }
}
const getId = generateID()
module.exports = Router