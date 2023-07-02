import ApiError from "../error/ApiError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User, Basket} from "../models/models.js";

const generateJwt = (id, email, role)=>{
   return  jwt.sign(
        {id,email,role},
        'secret_key',
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req,res,next){
        const {email,password,role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email существует'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,role,password:hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login (req,res,next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req,res,next){
        const {id} = req.query
        if(!id){
          return   next(ApiError.badRequest('Не задан id'))
        }
        res.json(id)
    }
}

export default new UserController()