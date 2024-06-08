import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken ')


const signup = async ( req, res) => {
    const {fullname, first_surname, second_surname, identification, email, password} = req.body;
    console.log(req.body);

    try {
        const user = await prisma.user.findFirst({
            where:{
                identification: identification,
            },
        });
        if (user) {
            res.status(400).json({erro: "User already exists"});
        }else{
            const newUser =await prisma.user.create({
                data: {
                    fullname,
                    first_surname,
                    second_surname,
                    identification,
                    email,
                    password: hashSync(password, 10)
                },
            });
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create user"})
    }
};



const login = async ( req, res) => {
    const {identification, password} = req.body;
    console.log(req.body);
    try {
        const user = await prisma.user.findFirst({
            where: {
                identification : identification
            },
        });

        if (user) {
            const valid = compareSync(password,user.password);
            if (valid) {
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                    expireIn: '1h',
                });
                res.status(200).json({user:token});
            }
            else{
                res.status(401).json({error: 'Invalid credentials'});
            }
        }
        else{
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to login"});
    }
}




const verifyToken =(req, res, next)=> {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({error: 'Token not provided'})
    }
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) =>{
        if (err) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        req.userId =decoded.id;
        next();
    });
}

const logout = (req, res) => {
    res.status(200).json({message: 'Logout successful'});
}



module.exports = {
    signup,
    login,
    verifyToken,
    logout
}

