import React from 'react';
import '../styles/EmailTemplate.css';

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    lastName,
    email
}) => {
    const event = {
        title: "Boda de Adrian y Ana, 12 de Octubre del 2024",
        description: "Boda de Adrian y Ana, , 12 de Octubre del 2024",
        locationCeremonia: "Iglesia de San Francisco a las 12.00h, Priego de Córdoba",
        locationBanquete: "Finca Genilla, Priego de Córdoba",
        startTime: "2024-10-12T12:00:00",
        endTime: "2024-10-12T14:00:00",
        contacts: {
            ana: process.env.NEXT_PUBLIC_ANA_CONTACT,
            adrian: process.env.NEXT_PUBLIC_ADRIAN_CONTACT
        },
        bankAccounts: {
            ana: process.env.NEXT_PUBLIC_ANA_BANK_ACCOUNT,
            adrian: process.env.NEXT_PUBLIC_ADRIAN_BANK_ACCOUNT
        }
    };

    const { title, description, locationCeremonia, locationBanquete, startTime, endTime, contacts, bankAccounts } = event;

    const start = new Date(startTime).toISOString().replace(/-|:|\.\d+/g, '');
    const end = new Date(endTime).toISOString().replace(/-|:|\.\d+/g, '');

    const detailsWithContacts = `${description}\n\nContactos:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}\n\nCuentas Bancarias:\nAna: ${bankAccounts.ana}\nAdrian: ${bankAccounts.adrian}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(detailsWithContacts)}&location=${encodeURIComponent(locationCeremonia)}`;

    const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(detailsWithContacts)}&startdt=${startTime}&enddt=${endTime}&location=${encodeURIComponent(locationCeremonia)}`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${detailsWithContacts}
LOCATION:${locationCeremonia}
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR`;
    const icsFile = new Blob([icsContent], { type: 'text/calendar' });
    const icsUrl = URL.createObjectURL(icsFile);

    return (
        <div className="container mx-auto p-6">

            {/* Sección en Español */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">¡Bienvenido, {firstName} {lastName}!</h1>
                <p className="mb-6">
                    Te has registrado exitosamente el día de nuestra boda.
                </p>
                <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
                <p className="mb-4">
                    <strong>{event.title}</strong>
                    <br />
                    <strong>Ceremonia:</strong> {event.locationCeremonia}
                    <br />
                    <strong>Banquete:</strong> {event.locationBanquete}
                </p>
                <p className="mb-4">
                    Para cualquier duda puedes contactarnos a estos números de teléfono:
                </p>
                <p className="mb-4">
                    <strong>Contactar a Ana:</strong> {contacts.ana}
                    <br />
                    <strong>Contactar a Adrian:</strong> {contacts.adrian}
                </p>
                <p className="mb-4">
                    Si entregar un sobre te resulta complicado, te facilitamos el número de cuenta:
                </p>
                <p className="mb-4">
                    <strong>Cuenta Bancaria de Ana:</strong> {bankAccounts.ana}
                    <br />
                    <strong>Cuenta Bancaria de Adrian:</strong> {bankAccounts.adrian}
                </p>
                <p className="mb-4">
                    No olvides añadir la fecha a tu calendario:
                </p>
                <div className="space-y-2">
                    <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        Añadir a Google Calendar
                    </a><br />
                    <a href={outlookCalendarUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        Añadir a Outlook Calendar
                    </a><br />
                    <a href={icsUrl} download="event.ics" className="text-blue-500 hover:underline">
                        Descargar archivo ICS
                    </a>
                </div>
            </div>

            <br></br>

            {/* Sección en Inglés */}
            <div className="mt-12">
                <h1 className="text-2xl font-bold mb-4">Welcome, {firstName} {lastName}!</h1>
                <p className="mb-6">
                    You have successfully registered on our wedding day.
                </p>
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <p className="mb-4">
                    <strong>{event.title}</strong>
                    <br />
                    <strong>Ceremony Location:</strong> {event.locationCeremonia}
                    <br />
                    <strong>Reception Location:</strong> {event.locationBanquete}
                </p>
                <p className="mb-4">
                    For any questions, you can contact us at these phone numbers:
                </p>
                <p className="mb-4">
                    <strong>Contact Ana:</strong> {contacts.ana}
                    <br />
                    <strong>Contact Adrian:</strong> {contacts.adrian}
                </p>
                <p className="mb-4">
                    If delivering an envelope is complicated for you, we provide the bank account numbers:
                </p>
                <p className="mb-4">
                    <strong>Ana&apos;s Bank Account:</strong> {bankAccounts.ana}
                    <br />
                    <strong>Adrian&apos;s Bank Account:</strong> {bankAccounts.adrian}
                </p>
                <p className="mb-4">
                    Don’t forget to add the event to your calendar:
                </p>
                <div className="space-y-2">
                    <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        Add to Google Calendar
                    </a><br />
                    <a href={outlookCalendarUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        Add to Outlook Calendar
                    </a><br />
                    <a href={icsUrl} download="event.ics" className="text-blue-500 hover:underline">
                        Download ICS File
                    </a>
                </div>
            </div>
        </div>
    );
};