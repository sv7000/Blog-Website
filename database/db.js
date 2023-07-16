//Here we are connecting our backend with database ussing mongoose
import mongoose from 'mongoose';




const Connection = async (username, password) => {
  
  const URL = `mongodb+srv://${username}:${password}@blog-app.dmibia0.mongodb.net/?retryWrites=true&w=majority`;
  try { 
    await mongoose.connect(URL, { useNewUrlParser: true})
    console.log(`successfully connected with the database`);
  } catch (error) {
    console.log(`error in connecting db, ${error}`);
  }
}

export default Connection;