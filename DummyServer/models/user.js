import mongoose from "mongoose";
import { createHmac, randomBytes } from "node:crypto"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    emailId: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    salt: {
        type: String,
        require: false,
    }
}, { timestamps: true });

userSchema.pre('save', function () {
    const user = this;

    const key = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', key)
        .update(user.password)
        .digest("hex");

    this.password = hashedPassword;
    this.salt = key;
});

userSchema.static('verifyUser', async function (emailId, password) {
    const user = await this.findOne({ emailId: emailId });
    const hashedPassword = createHmac('sha256', user.salt)
        .update(password)
        .digest("hex");

    if (user.password == hashedPassword) {
        return user;
    }
    return null;
})

export const User = mongoose.model('user', userSchema);