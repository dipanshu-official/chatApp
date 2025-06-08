import mongoose from "mongoose";

const messageSchema = new mongoose.model(
  {
    name: {
      type: String,
      requrie,
    },
    email: {
      type: String,
      requrie,
      unique,
    },

    message: {
      type: String,
      require,
    },
  },
  {
    timestamp: true,
  }
);

const message = mongoose.model("message", messageSchema);
export default message;
