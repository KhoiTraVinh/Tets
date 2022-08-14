import database from 'mongoose';

const userSchema = new database.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    avatar: {type: String, required: true},
    role: {type: Boolean, default: false, required: true},
},
{
    timestamps: true,
});
const User = database.model('User', userSchema);
export default User;