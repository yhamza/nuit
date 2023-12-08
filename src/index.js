const express=require('express')
const app=express()

const port =process.env.PORT ||3000

app.use(require('./api/image'))
app.use(require('./api/video'))

app.get('/',(req,res)=>{
    res.send('hello')
})



app.listen(port,()=>{
    console.log("server start")
})