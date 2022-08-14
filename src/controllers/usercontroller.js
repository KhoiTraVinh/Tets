import User from '../models/user.js';
import {Token} from '../middleWare/jwt.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';


const Login = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                avatar: user.avatar,
                role: user.role,
                token: Token(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Wrong username or password'});
});

const Register = expressAsyncHandler(async (req, res) => {
    const user = new User({
        username : req.body.username,
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        password : bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.fullName,
        email: createdUser.username,
        avatar: createdUser.avatar,
        role: createdUser.role,
        token: Token(createdUser),
    })
});

const GetMyUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user);
    }else{
        res.status(404).send({message: 'User Not Found'});
    }
});

const PutProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.fullName = req.body.fullName || user.fullName;
        user.username = req.body.username || user.username;
        user.avatar = req.body.avatar || user.avatar;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            avatar: updatedUser.avatar,
            role: updatedUser.role,
            token: generateToken(updatedUser),
        });
    }
});


const PutMyUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.username = req.body.username || user.username;
      user.role = Boolean(req.body.role) || user.role;
      const userupdated = await user.save();
      res.send({ message: 'User Updated', user: userupdated });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
});


const GetAllUser = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role) {
        res.status(400).send({ message: 'Didnt delete AdminAcount' });
        return;
      }
      const DeleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: DeleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
});

export const UserController = {
    Login,
    Register,
    DeleteUser,
    GetAllUser,
    PutMyUser,
    PutProfile,
    GetMyUser
}