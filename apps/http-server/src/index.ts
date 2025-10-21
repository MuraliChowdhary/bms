import express from 'express'
import bcrypt, { hash } from "bcryptjs"
const app = express()
import {prisma} from "@repo/db"



app.use(express.json());

app.get("/health",(req,res)=>{
    res.json("Health check for http server");
})

app.post("/api/signup", async (req, res) => {
    const { email, password, username } = req.body;

    try {
        if (!email || !password || !username) {
             res.status(400).json({ message: "Email, password, and username are required fields" });
             return
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
             res.status(409).json({ message: "User with this email already exists!" });
             return
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { email, Username : username, password: hashPassword },
            select: { id: true, email: true, Username: true }
        });

         res.status(201).json({
            message: "Registration Successful",
            newUser
        });
        return

    } catch (err) {
        console.error(err);
         res.status(500).json({ message: "Internal server error", err });
         return 
    }
});


app.listen(3002,()=>{
    console.log("Server is running");
})