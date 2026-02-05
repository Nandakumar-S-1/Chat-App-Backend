import express from 'express';
import { Server } from 'socket.io'
import { configDotenv } from 'dotenv';
import http from 'http'
import mongoose from 'mongoose';
import cors from 'cors';


import AuthRoutes from './Routes/AuthRoutes.js'

configDotenv()
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_UR)
    .then(() => console.log('database cononection established'))
    .catch(err => {
        console.log('db error', err)
})



const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use('/api/auth',AuthRoutes)


io.on('connection', (socket) => {
    console.log('Here a user has connected')
})
// const socket=io()
// socket.io('connect',()=>{
//     console.log('connected to the server')    
// })


server.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`)
})