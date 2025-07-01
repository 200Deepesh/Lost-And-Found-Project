import { Router } from 'express';
import { Item } from '../models/item.js';

const router = Router();

router.get('/recent', async (req, res) => {
    let lostRecentItems = await Item.find({ initialStatus: 'lost' },
        'itemInfo.name itemInfo.date itemInfo.location url')
        .sort({ createdAt: 'desc'})
        .limit(4);
    let foundRecentItems = await Item.find({ initialStatus: 'found' },
        'itemInfo.name itemInfo.date itemInfo.location url')
        .sort({ createdAt: 'desc'})
        .limit(4);
    return res.json({ lost: lostRecentItems, found: foundRecentItems });
});

router.get('/:initialStatus', async (req, res) => {
    const initialStatus = req.params.initialStatus;
    let items = await Item.find({ initialStatus: initialStatus });
    items = items.map((item) => {
        const { studentInfo, ...rest } = item._doc;
        return rest;
    });
    return res.json(items);
});

router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    return res.json(item);
});

router.post('/', async (req, res) => {
    const { itemInfo, studentInfo, initialStatus } = req.body;
    console.log(req.body);
    const item = await Item.create({
        itemInfo: itemInfo,
        studentInfo: studentInfo,
        initialStatus: initialStatus,
        url: '/item.png',
        userId: req.userId
    });
    return res.json(item);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { itemInfo, studentInfo, initialStatus } = req.body;
    const updatedItem = await Item.updateOne({ _id: id }, {
        itemInfo: itemInfo,
        studentInfo: studentInfo,
        initialStatus: initialStatus,
        url: '/item.png'
    });
    return res.json(updatedItem);
});

router.post('/filters', async (req, res) => {
    const body = req.body;
    console.log(body);
    const filters = [...body.filters.date, ...body.filters.items, ...body.filters.location];
    console.log(filters);
    let items = await Item.find({ "itemInfo.tags": { $in: filters }, initialStatus: body.page });
    console.log(items);
    items = items.map((item) => {
        const { studentInfo, ...rest } = item._doc;
        return rest;
    });
    return res.json({ items: items });
});

export default router;