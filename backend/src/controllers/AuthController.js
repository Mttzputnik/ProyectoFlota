const { PrismaClient } = require("@prisma/client");
const { compareSync, hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            res.status(400).json({ error: "User already exists" });
        } else {
            const newUser = await prisma.user.create({
                data: {
                    email,
                    current_password: hashSync(password, 10),
                    active_user: true, // Assuming default active status
                    role: "user", // Assuming default role
                },
            });
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create user" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            const valid = compareSync(password, user.current_password);
            if (valid) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                res.status(200).json({ user: token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login" });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token not provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
};

const logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    signup,
    login,
    verifyToken,
    logout,
};
