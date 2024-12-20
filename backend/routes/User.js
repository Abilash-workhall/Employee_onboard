const express=require("express");
const bcrypt = require("bcryptjs");
const rot=express.Router();
const User=require('../modules/User_Model');
const Onbd=require('../modules/Personal_detial')
const noti=require('../modules/Notification');
const multer = require("multer");
const path = require("path");
const fs = require("fs")
rot.get("/test",(req,res)=>{
    res.send("Hi success");
})
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId; 
    const userDir = path.join(uploadDir, userId); 

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir); 
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId; 
    const documentName = file.fieldname; 
    const fileExtension = path.extname(file.originalname); 
    cb(null, `${documentName}_${userId}${fileExtension}`); 
  },
});

const upload = multer({ storage });


rot.post("/upload_documents",upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "marksheet10", maxCount: 1 },
    { name: "marksheet12", maxCount: 1 },
    { name: "collegeMarksheet", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.body.userId; 
      const files = req.files;
      const user = await Onbd.findOne({ SigininId: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (files.resume) {
        user.docs.resume = files.resume[0].filename; 
      }
      if (files.marksheet10) {
        user.docs.marksheet_10th = files.marksheet10[0].filename; 
      }
      if (files.marksheet12) {
        user.docs.marksheet_12th = files.marksheet12[0].filename; 
      }
      if (files.collegeMarksheet) {
        user.docs.marksheet_clg = files.collegeMarksheet[0].filename; 
      }

      user.status = "Document Uploaded";
      user.status_id = 2;
      await user.save();
      res.status(200).json({
        message: "Files uploaded and user documents updated successfully!",
        files: req.files,
        updatedDocs: user.docs,
      });
    } catch (error) {
      console.error("Error updating documents:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

rot.post("/n", async(req,res)=>{
  try{
  const {ToUserId, ByUserId , Message , date } =req.body;
  console.log(req.body);
  console.log(req.body.Message);
  const sdate = new Date();
  const notification = new noti({
    ToUserId,
    ByUserId,
    Message,
    sdate
  })
  await notification.save();
  res.status(200).json({ message: 'Message sent success'});
}catch(err){
  console.error('Error creating user:', err);
  res.status(500).json({ message: 'Internal server error While Notifation'});
}
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

rot.post("/verify/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from request parameters
    const user = await Onbd.findOneAndUpdate(
      { SigininId: userId }, // Correct query to find user by _id
      {
        status: "Completed",
        status_id: 5,
      },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Document Verified successfully",
      updatedUser: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


rot.post("/onboard/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from request parameters
    const user = await Onbd.findOneAndUpdate(
      { SigininId: userId }, // Correct query to find user by _id
      {
        status: "Onboarded",
        status_id: 6,
      },
    );
    const ToUserId=userId;
    const ByUserId="Admin";
    const style = "bg-blue-500"
    const Message="Congratulations ✨✨🎊 You  have been onboarded . Further detials will be sent through mail ";
    const sdate=new Date();
    const notification = new noti({
      ToUserId,
      ByUserId,
      Message,
      sdate
    })
    await notification.save();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Onboarded successfully",
      st:style
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
        res.json({ Detials: user , role: user.role});
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
        SigininId,
} = req.body;
const status="Form Filled";
const status_id=1;
    try {
        const newUser = new Onbd({
            Fullname,
            Email,
            Phonenumber,
            Department,
            Designation,
            Joiningdate,
            SigininId,
            status,
            status_id,
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
rot.post("/User_data/:id", async (req, res) => {
    try {
      const  _id  = req.params.id
    console.log(_id);
      if (!_id) {
        return res.status(400).json({ message: "Email is required" });
      }
      const userDocument = await Onbd.findOne({SigininId: _id });
      if (!userDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.status(200).json({
        message: "Document status retrieved successfully",
        Detials: userDocument, 
      });
    } catch (error) {
      console.error("Error fetching document status:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  rot.post("/logged_user_data/:id", async (req, res) => {
    try {
      const  _id  = req.params.id
    console.log(_id);
      if (!_id) {
        return res.status(400).json({ message: "Email is required" });
      }
      const userDocument = await Onbd.findOne({ SigininId: _id });
      const notification= await noti.find({ToUserId:_id})
      if (!userDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      console.log(notification)
      return res.status(200).json({
        message: "Document status retrieved successfully",
        Detials: userDocument,
        notifiactions: notification,
      });
    } catch (error) {
      console.error("Error fetching document status:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

rot.put("/update", async (req, res) => {
    const { id, designation, status, department } = req.body;

    try {
        if (!id || !designation || !status || !department) {
            return res.status(400).json({ message: "All fields are required: id, designation, status, department" });
        }

        const updatedOnbd = await Onbd.findByIdAndUpdate(
            id, 
            { designation, status, department }, 
            { new: true } 
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