const mongoose = require("mongoose");
const User=require("../models/userModel")
const teamSchema = new mongoose.Schema({
  teamId:{
    type:Number,
  },
  name:{
    type:String
  },
  Details: {
    type: String,
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  
});



module.exports = mongoose.model("Team", teamSchema);
