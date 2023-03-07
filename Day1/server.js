const express= require('express');
const app=express();
const PORT=process.env.PORT||3500;
const {logger} = require('./middleware/logger')
const path=require('path');
const erroHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

app.use(logger);

app.use('/',express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(cookieParser())

app.use('/',require('./routes/root'))

app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({
            message:'404 not found'
        });
    }else{
        res.type('txt').send('404 not found');
    }
})

app.use(erroHandler)

app.listen(PORT,()=>console.log(`Listning on PORT:${PORT}`));
