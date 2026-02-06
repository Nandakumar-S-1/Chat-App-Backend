import Chat from '../Models/Chats.js'
import User from '../Models/User.js'
import Message from '../Models/Message.js'


export const createConversation = async (req,res) => {
    try {

        const {participents} =req.body
        const user = await User.findOne({userName:{$in:participents}})

        

        const newChat = new Chat(req.body)
        await newChat.save()

        res.status(201).json(newChat)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}