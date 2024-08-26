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
        description: "Boda de Adrian y Ana, 12 de Octubre del 2024",
        locationCeremonia: "Iglesia de San Francisco a las 12.00h, Priego de Córdoba",
        locationCeremoniaEN: "San Francisco Church at 12:00 PM, Priego de Córdoba",
        locationBanquete: "Finca Genilla, Priego de Córdoba",
        startTime: "2024-10-12T12:00:00",
        endTime: "2024-10-12T13:00:00",
        contacts: {
            ana: process.env.NEXT_PUBLIC_ANA_CONTACT,
            adrian: process.env.NEXT_PUBLIC_ADRIAN_CONTACT
        },
    };

    const { title, description, locationCeremonia, locationBanquete, startTime, endTime, contacts } = event;

    const start = new Date(startTime).toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';
    const end = new Date(endTime).toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';

    const getGoogleCalendarUrl = (lang: 'es' | 'en') => {
        const titleText = lang === 'es' ? title : "Adrian & Ana Wedding, 12th October 2024";
        const detailsText = lang === 'es' ?
            `${description}\n\nContactos:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}` :
            `Adrian & Ana Wedding, 12th October 2024\n\nContacts:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}`;
        const locationText = lang === 'es' ? locationCeremonia : "San Francisco Church at 12:00 PM, Priego de Córdoba";

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titleText)}&dates=${start}/${end}&details=${encodeURIComponent(detailsText)}&location=${encodeURIComponent(locationText)}`;
    };

    const getOutlookCalendarUrl = (lang: 'es' | 'en') => {
        const titleText = lang === 'es' ? title : "Adrian & Ana Wedding, 12th October 2024";
        const detailsText = lang === 'es' ?
            `${description}\n\nContactos:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}` :
            `Adrian & Ana Wedding, 12th October 2024\n\nContacts:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}`;
        const locationText = lang === 'es' ? locationCeremonia : "San Francisco Church at 12:00 PM, Priego de Córdoba";

        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(titleText)}&body=${encodeURIComponent(detailsText)}&startdt=${startTime}&enddt=${endTime}&location=${encodeURIComponent(locationText)}`;
    };

    const getIcsContent = (lang: 'es' | 'en') => {
        const titleText = lang === 'es' ? title : "Adrian & Ana Wedding, 12th October 2024";
        const detailsText = lang === 'es' ?
            `${description}\n\nContactos:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}` :
            `Adrian & Ana Wedding, 12th October 2024\n\nContacts:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}`;
        const locationText = lang === 'es' ? locationCeremonia : "San Francisco Church at 12:00 PM, Priego de Córdoba";

        return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${titleText}
DESCRIPTION:${detailsText}
LOCATION:${locationText}
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR`;
    };

    const getIcsUrl = (lang: 'es' | 'en') => {
        const icsContent = getIcsContent(lang);
        const icsFile = new Blob([icsContent], { type: 'text/calendar' });
        const icsUrl = URL.createObjectURL(icsFile);
        return icsUrl;
    };

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
                    <strong>Adrian & Ana Wedding, 12th October 2024</strong>
                    <br />
                    <strong>Ceremony Location:</strong> {event.locationCeremoniaEN}
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
                
            </div>
        </div>
    );
};