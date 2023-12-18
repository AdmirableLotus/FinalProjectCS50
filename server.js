const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/lovedonedb', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    journals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Journal' }],
    settings: {
        deliveryReminders: Boolean,
    },
});

const journalSchema = new mongoose.Schema({
    title: String,
    description: String,
    entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    deliveryDate: Date,
});

const entrySchema = new mongoose.Schema({
    content: String,
    images: [String],
});

const User = mongoose.model('User', userSchema);
const Journal = mongoose.model('Journal', journalSchema);
const Entry = mongoose.model('Entry', entrySchema);

const secretKey = 'your-secret-key'; // Replace with a secure secret key

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email }, secretKey);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('journals');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/user/:userId/settings', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user.settings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/user/:userId/settings', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.settings = req.body.settings;
        await user.save();
        res.json({ message: 'User settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
