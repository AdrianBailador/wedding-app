import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email } = body;

    console.log("Received POST request with body:", body);

    try {
        const { data, error } = await resend.emails.send({
            from: `${name} <${email}>`,  // Utiliza el correo proporcionado por el usuario
            to: ['adrianbailador@hotmail.com'], // Cambia esto al correo al que deseas enviar los correos
            subject: 'Hello world',
            text: 'Hello world',
            react: EmailTemplate({ firstName: name }),
        });

        if (error) {
            console.error("Error sending email:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        console.log("Email sent successfully:", data);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
