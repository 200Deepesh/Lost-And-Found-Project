import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemInfo: {
        name: {
            type: String,
            require: true
        },
        date: {
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true
        },
        discription: {
            type: String,
            require: true
        },
        tags: [{ type: String }],
    },
    initialStatus: {
        type: String,
        require: true
    },
    url: {
        type: String,
        default: '/item.png'
    },
    userId: {
        type: String,
        require: true
    },
    studentInfo: {
        name: {
            type: String,
            require: true
        },
        branch: {
            type: String,
            require: true
        },
        sem: {
            type: String,
            require: true
        },
        phoneNo: {
            type: String,
            require: true
        },
        emailId: {
            type: String,
            require: true
        },
    }
}, { timestamps: true });


export const Item = mongoose.model('item', itemSchema);

