const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const RouterUser = express.Router();
const USER = require("./Model/user");
const connection = require("./connectDB");
app.use(express.json());
app.use(RouterUser);

connection();

//get users

//post users//////////////////////////////////

RouterUser.post("/postuser", async (req, res) => {
  try {
    const newuser = new USER(req.body);
    console.log(req.body);
    await newuser.save();
    return res.status(201).send({ msg: "user add succes" });
  } catch (error) {
    console.log(error);
  }
});

RouterUser.get("/all", async (req, res) => {
  try {
    let getUser = await USER.find();
    return res.send(getUser);
  } catch (error) {
    console.log(error);
  }
});





//update by id

app.patch("/update/:id", async(req,res)=>{

  try {

      let updateUSer= await USER.findByIdAndUpdate(req.params.id,req.body,{ new: true })
      if (updateUSer) {
          res.json(updateUSer);
      } else {
          res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
  } catch (error) {
      console.log(error)
  }
})

//delete user by id
app.delete("/delete/:id", async(req,res)=>{

  try {
      const deleted= await USER.deleteOne({_id:req.params.id})
      return res.status(200).send(deleted)
      
  } catch (error) {
      console.log(error)
  }
})



app.listen(PORT, () => {
  console.log("server is running");
});
