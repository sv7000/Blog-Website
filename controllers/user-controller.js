import bcrypt from 'bcrypt';
import User from "../model/user.js";

export const signUpApi = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, name: req.body.name, password: hashedPassword }
   
    const newUser = new User(user);
    await newUser.save();

    return res.status(200).json({msg: 'signup succesfull'})
  } catch (error) {
   
    return res.status(500).json({msg: 'error while signup'})
    
  }
}