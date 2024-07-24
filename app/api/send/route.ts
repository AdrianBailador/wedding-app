import { Resend } from 'resend';
import {EmailTemplate} from "@/components/Email-template";
import {NextRequest, NextResponse} from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { name, surname, email } = body;
        console.log(name, surname, email)
        try {
            const response = await resend.emails.send({
                to: email,
                from: 'no-reply@adrianyana.com', // Reemplaza con tu dirección de correo
                subject: 'Boda de Adrian y Ana, 12 de Octubre del 2024 - Bienvenido/Welcome! 🎉',
                react: EmailTemplate({ firstName: name, lastName: surname, email: email}),
                text: ``,
            });
            console.log(res, response)
            return NextResponse.json({ message: 'Correo enviado', response });
        } catch (error) {
            console.error(error);
            console.log(res, error)
            return NextResponse.json({ message: 'Error al enviar el correo', error });
        }
    } else {
        console.log(res)
    }
}
