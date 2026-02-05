import express from 'express'
import User from '../Models/User.js'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

export async function register(req,res){
    const {username,password}=req.body
    try {
        let userExist = await User.findOne({userName:username})

        if(userExist){
            return res.status(400).json({message:'user alredy exist here'})
        }

        const hash = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,hash)

        const newUser = new User({userName:username,password:hashedPass})

        await newUser.save()

        res.status(201).json({message:'new user has been created.'})
    } catch (error) {
        res.status(500).jsono({message:error.message})
    }
 }

 export async function login(req,res) {
    const {username,password}=req.body
    try {
        let userExist = await User.findOne({userName:username})

        if(userExist){
            return res.status(400).json({message:'user alredy exist here'})
        }

        let isMatchingPass = await bcrypt.compare(password,userExist.password)

        if(!isMatchingPass){
            return res.status(400).json({message:'Invalid data sent'})
        }

        const token = jwt.sign({
            userId:userExist._id,
        userName:userExist.userName
        },process.env.JWT_SECRET,{
            expiresIn:'1h'
        })

        res.status(201).json({token:token,'UserId':userExist._id})
    } catch (error) {
        res.status(500).jsono({message:error.message})
    }
 }

