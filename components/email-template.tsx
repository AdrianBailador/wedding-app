import React from "react";

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = (
    {
        firstName,
        lastName,
        email
    }
) => (
    <div>
        <h1>Welcome, {firstName} {lastName}!</h1>
        <p>
            You have successfully signed up for our newsletter. You will receive our latest updates at {email}.
        </p>
        <a href="https://victoralvarado.dev" target="_blank" rel="noreferrer">
            Visit our website
        </a>
    </div>
);
