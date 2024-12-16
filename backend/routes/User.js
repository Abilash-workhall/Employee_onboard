const express=require("express");
const bcrypt = require("bcryptjs");
const rot=express.Router();
const User=require('../modules/User_Model');
const Onbd=require('../modules/Personal_detial')
rot.get("/test",(req,res)=>{
    res.send("Hi success");
})
rot.post("/new",async (req,res)=>{
    const { umail , uname , password , role} = req.body;
    try {
        const upassword=await bcrypt.hash(password,11);
        const newUser = new User({
            umail,
            uname,
            role,
            upassword,
        });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully',uname });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
rot.post("/login",async(req,res)=>{
    try {
        const { umail, upassword } = req.body;
        console.log(umail);
      
        const user = await User.findOne({ umail });
        if (!user) {
          return res.status(404).send("User not found");
        }
        const isMatch = await bcrypt.compare(upassword, user.upassword);
        if (!isMatch) {
          return res.status(401).send("Invalid credentials");
        }
        const token = tkngtr(user);
        console.log(user.role);
        res.json({ token, role: user.role});
        console.log("Login Success");
      }catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send("Internal server error");
    }
})

rot.get("/geud/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const uid=req.user.uid;
        console.log(uid);
        const user = await User.findOne({uid});
        if (!user) {
          return res.status(404).send("User not found");
        }
        return res.status(200).json({user});
        console.log(user);
        console.log("Login Success");
      }catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send("Internal server error");
    }
})
rot.get("/data",(req,res)=>{
    res.json({message:`welcome,encypted`});
})


rot.post("/new_onbord",async (req,res)=>{
    const {            
        Fullname,
        Email,
        Phonenumber,
        Department,
        Designation,
        Joiningdate,
} = req.body;
console.log(req.body);
    try {
        const newUser = new Onbd({
            Fullname,
            Email,
            Phonenumber,
            Department,
            Designation,
            Joiningdate,
        });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully'})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
rot.get("/getall_onb", async (req, res) => {
    try {
        const yui = await Onbd.find({});
        if (yui) {
            res.status(200).json({ us: yui });
        } else {
            res.status(404).json({ error: "No users found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

rot.put("/update", async (req, res) => {
    const { id, designation, status, department } = req.body;

    try {
        // Validate required fields
        if (!id || !designation || !status || !department) {
            return res.status(400).json({ message: "All fields are required: id, designation, status, department" });
        }

        // Find and update the document with the specified ID
        const updatedOnbd = await Onbd.findByIdAndUpdate(
            id, 
            { designation, status, department }, 
            { new: true } // Return the updated document
        );

        if (!updatedOnbd) {
            return res.status(404).json({ message: "No document found with the given ID" });
        }

        res.status(200).json({ message: "Document updated successfully", updatedOnbd });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports=rot;