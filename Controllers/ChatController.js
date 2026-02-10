import Chat from '../Models/Chats.js'
import User from '../Models/User.js'
import Message from '../Models/Message.js'


export const createConversation = async (req,res) => {
    try {

        const {participents} =req.body
        const users = await User.findOne({userName:{$in:participents}})

        if(users.length!==participents.length){
            return res.status(404).json({message:'one or more users are missing here'})
        }

        const participentIds = users.map(user=>user._id)

        const newChat = new Chat({participents:participentIds})
        await newChat.save()

        res.status(201).json(newChat)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getConversationByUser = async (req,res) => {
    try {
        const userId = req.user._id
        const chat =await Chat.find({participents:userId})

        res.status(200).json(chat)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getMessageByChat =  async (req,res) => {
    const {conversationId}=req.params;
    try {
        
        const messages =  await Message.find({conversation:conversationId}).populate('sender','userName')        
    
        res.status(200).json({messages})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}