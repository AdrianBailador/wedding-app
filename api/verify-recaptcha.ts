// pages/api/verify-recaptcha.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { token } = req.body;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
        );

        const data = response.data;

        if (data.success) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, error: data['error-codes'] });
        }
    } catch (err) {
        const error = err as Error;
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
