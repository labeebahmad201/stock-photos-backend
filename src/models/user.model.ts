import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
  email: String,
}, 
{timestamps: true}
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
