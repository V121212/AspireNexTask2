const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 1000
const User  = require('./models/User')

app.use(cors())
app.use(express.json())//if we want to use req.body this middleware is required

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/quiz', require('./routes/quiz'))

connectToMongo();

app.listen(port, () => {
  console.log(`quiz backend listening on port ${port}`)
})



app.post('/set_count', async (req, res) => {
  const { email } = req.body;
  // const {upCount1} = req.body; // Log the entire request body

  // let upCount = parseInt(upCount1); 


  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (user) { 
      user.count += 1; 
      await User.findOneAndUpdate({ email: email }, { count: user.count });
      res.status(200).json({ message: "User count updated", count: user.count });
    } else {
      res.status(201).json({ message: "user not found"});
    }
  } catch (error) {
    res.status(500).json({ error: "Error in updating count" });
  }
}); 



// POST endpoint to delete count
app.post('/delete_count', async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Request body:', req.body); // Log the request body
    console.log('Email:', email); // Log the email being searched for

    // Find the user by email
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (user) {
      console.log('Current count:', user.count);
      user.count -= 1;
      console.log('Updated count:', user.count);
      if(user.count < 0){
        user.count = 0;
      }

      await User.findOneAndUpdate({ email: email }, { count: user.count });
      res.status(200).json({ message: "User count updated", count: user.count });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ error: "Error in updating count" });
  }
});   



app.get('/get_count', async (req, res) => {
  const { email } = req.query;
  console.log(email) ;
    
  if(!email){
    return res.status(400).json({Status:'error' , message:"User not found"});
  }

  User.findOne({email:email})
  .then(user => {
    if(!user){
      return res.status(404).json({Status:'error' , message:"User not found"});
    }
    return res.json({
      count:user.count
    });
  }).catch(err => {
    return res.status(500).json({Status:'error' , message:"Error while sending the count"});
  })



});