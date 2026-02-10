import Message from "../Models/Message";

export const sentMessage = async (req,res) => {
    const {conversation,sender,text}=req.body
    try {
        const newMessage = new Message({conversation,sender,text})
        await newMessage.save()
        res.status(201).json({newMessage})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getMessageByChat = async (req,res) => {
    const {conversationId}=req.params
    try {
        const messages =await Message.find({})
        await newMessage.save()
        res.status(201).json({newMessage})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

