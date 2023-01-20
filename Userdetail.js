const mongoose = require('mongoose')

const UserDetailSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        dob: String,
        address: String
    },
    {
        collection :"data"
    }
);

mongoose.model("data", UserDetailSchema)