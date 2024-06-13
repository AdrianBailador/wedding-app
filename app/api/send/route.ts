import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import {NextRequest} from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    // body of our request - to be sent from the Client-side in our form above
    const { name, email } = body;
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Hello world',
            text: 'Hello world',
            react: EmailTemplate({ firstName: name }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
