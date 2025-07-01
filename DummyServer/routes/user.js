import { Router } from 'express';
import { User } from '../models/user.js';
import { Item } from '../models/item.js';
import { genrateToken, verifyToken } from '../services/token.js';

const router = Router();

router.post('/signup', async (req, res) => {
    const { emailId, userName, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (user) {
        return res.status(400).json({ error: { emailId: { message: 'emailId is already registered' } } });
    }

    const newUser = new User({
        emailId: emailId,
        password: password,
        userName: userName,
    });
    await newUser.save();
    return res.status(200).json({ message: 'user is registered successfully' });
});

router.post('/signin', async (req, res) => {
    const { emailId, password } = req.body;

    const user = await User.verifyUser(emailId, password);

    if (!user) {
        return res.status(400).json({ error: { password: { message: 'invalid password' } } });
    }

    const sessionId = genrateToken({ emailId: emailId, _id: user._id }, 7);

    res.status(200).json({ sessionId: sessionId, name: user.userName, _id: user._id });
});

router.post('/sessionId', async (req, res) => {
    const { sessionId } = req.body;
    const user = verifyToken(sessionId);
    console.log(user);
    if(user){
        return res.status(200).json(user);
    }
    return null;
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    let items = await Item.find({ userId: userId });
    items = items.map((item) => {
        return { url: item.url, name: item.itemInfo.name, id: item.id, initialStatus: item.initialStatus }
    });

    return res.json({ items: items });
});


export default router;