import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
mongoose.connect('mongodb://reactapp:reactapp@ds161039.mlab.com:61039/reaactapp');
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
  }
);

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true, unique: true },
  password: String,
});
let User = mongoose.model('User', UserSchema);


export function login (req, res, next) {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(422).json(err);
    if(!user) return res.status(422).json('invalid credentials');
    let token = jwt.sign(user, 'reactstartapplication', {
      expiresIn: 1440, // expires in 24 hours
    });
    res.status(200).json({
      success: true,
      token: token,
    });
  });
}

export function signUp (req, res, next){
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return res.status(422).json(err);
    res.json(user);
  });
}

export function listUsers (req, res, next){
  User.find({}, '-password',(err, users) => {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
}
