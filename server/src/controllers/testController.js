import message from "../models/testModal.js";

const getMessage = async (req,res) => {
  const {name ,email, message} = req.body

  if(!name || !message || !email) {
    return res.stauts(400).json({send : ' invalid message'})
  }

   const newMessage = new message({
      name,
      email,
      message,
    });



    



}