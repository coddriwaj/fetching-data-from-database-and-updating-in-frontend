require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.mongourl);
  console.log('MongoDB connected successfully');
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
});

const User = mongoose.model('Sigin', userSchema);


app.get('/about', async(req, res) => {
  const emails = await User.find({}).distinct('email');
    res.json(emails);

});
//for storing in db
    /*const newUser = new User({ email, password });
    await newUser.save();
    res.redirect('/redirectingpage.html');*/
    //for updating the existing db
   /* const user = await User.findOne({ email});
    if (user) {
      if(user.password!==password&&user.email==email){
        user.password=password;
        await user.save();
        res.redirect('/redirectingpage.html');
      }
    }
    
  
});*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
