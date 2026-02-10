import express from 'express'
import { createConversation, getConversationByUser, getMessageByChat } from '../Controllers/ChatController'
import authMid from '../Middlewares/Auth'

const router = express.Router()
router.post('/',authMid, createConversation)
router.get('/',authMid,getConversationByUser)
router.get('/:conversationId/messages',authMid,getMessageByChat)

export default router;