const mongoose = require("mongoose");
const { Schema } = mongoose;
const uri = "mongodb://localhost:27017/groww_chatbot";

//mongoDB and mongoose setup, connection to DB and schemas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  userName: String,
  password: String,
  isKYCDone: Boolean,
  orders: [
    {
      orderName: String,
      orderAmount: Number,
      orderId: String,
      orderStatus: Boolean,
    },
  ],
});

const UserInfo = mongoose.model("UserInfo", userSchema);
module.exports = UserInfo;
