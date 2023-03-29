import express, {Request,Response,NextFunction, Application} from 'express';
import dotenv from 'dotenv'
dotenv.config()
const PORT:Number = Number(process.env.PORT || 3000)

const app:Application = express()
app.use(express.json())

// Not Found Middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    return res.json({success:false,message:'Not Found'})
})

//Listning Server
app.listen(PORT,()=>console.log(`SERVER IS LISTING ON ${PORT}`))