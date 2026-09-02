require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
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


app.post('/', async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  if (user.password !== password) {
    return null;
  }
 res.redirect('/redirectingpage.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
