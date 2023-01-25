const express=require('express')

const cors=require('cors')

const datsService=require('./services/dataService')



const app=express()

//to parse JSON
app.use(express.json())

app.listen(3000,()=>{
    console.log('listening on port 3000');
})
app.use(cors({
    origin:'http://localhost:4200'
}))

//api to get all products

app.get('/all-products',(req,res)=>{
    datsService.getProducts()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//api to add wishlist item
app.post('/addtowishlist',(req,res)=>{
    datsService.addtowishlist(req.body.id,req.body.title,req.body.price,req.body.image,req.body.description)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//api to get wishlist item
app.get('/getwishlist',(req,res)=>{
    datsService.getwishlist()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//api to delete wishlist products
app.delete('/deletewish/:id',(req,res)=>{
    datsService.deletewish(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})