import mongoose from 'mongoose';

export const DataBase = mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost/khoi' ,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});