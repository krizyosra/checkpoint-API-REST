const mongoose= require("mongoose")

const connect=async()=>{

    try {

        await mongoose.connect(process.env.URI)
        console.log("db connected")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports=connect