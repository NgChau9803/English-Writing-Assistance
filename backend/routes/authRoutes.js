import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();
const authRouter = express.Router();

authRouter.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: 'Successfully Logged In',
            user: req.user
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
    passport.authenticate('google', {
        successRedirect: `${process.env.CLIENT_URL}/dashboard`,
        failureRedirect: '/login/failed'
    })
);

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

export default authRouter;
