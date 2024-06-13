import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Assuming you have a User model to interact with the Users table

const client = new OAuth2Client(process.env.CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ where: { google_id: googleId } });
    if (!user) {
      user = await User.create({ google_id: googleId, email, name });
    }

    const jwtToken = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', jwtToken, { httpOnly: true });
    res.status(200).json({ message: 'Authenticated successfully' });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error });
  }
};
