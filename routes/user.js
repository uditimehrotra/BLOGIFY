const {Router} = require("express");
const User= require('../models/user');

const router = Router();

router.get('/signin',(req,res)=>{
    return res.render("signin");
});

router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.post('/signin',async (req,res)=>{
    const { email, password}= req.body;

    const user= await User.matchPassword(email,password);
    console.log(user);
    return res.redirect("/");
})

router.post('/signup',async (req,res)=>{
    try {
        const { fullName, email, password } = req.body;
        const newUSer=await User.create({ fullName, email, password });
        console.log("user created",newUSer);
        return res.redirect("/");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
})

module.exports = router;