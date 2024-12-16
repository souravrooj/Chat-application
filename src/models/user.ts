import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    createdAt: Date;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
