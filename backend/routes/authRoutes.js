import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const authRouter = express.Router();

authRouter.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: 'Successfully Logged In',
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: 'Not Authorized' });
    }
});

authRouter.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Log in failure'
    });
});

authRouter.get('/google', passport.authenticate('google', ['profile', 'email']));

authRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login/failed' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id, name: req.user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
    }
);


authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

export default authRouter;
