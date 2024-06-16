// GuestFormFormik.tsx

'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { sendEmail } from '@/api/sendEmail'; // Adjust the path according to your setup
import { createGuest } from '@/api/createGuest'; // Adjust the path according to your setup
import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface Values {
    name: string;
    surname: string;
    email: string;
    token: string;
    assistance: boolean;
    accompanist: boolean;
    recaptchaToken: string;
}

const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
};

const GuestForm: React.FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isVerified, setIsVerified] = useState(true);  // Set to true initially for v3

    const initialValues: Values = {
        name: '',
        surname: '',
        email: '',
        token: generateToken(),
        assistance: false,
        accompanist: false,
        recaptchaToken: '',
    };

    const handleCaptcha = async () => {
        if (!executeRecaptcha) {
            console.error('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('submitForm');
        return token;
    };

    const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        try {
            const recaptchaToken = await handleCaptcha();
            if (recaptchaToken) {
                values.recaptchaToken = recaptchaToken;

                // Create guest and get document ID
                const docId = await createGuest(values);
                console.log('Guest created successfully with ID:', docId);

                // Send email to the provided email address
                await sendEmail(values);

                // Reset form after submission
                setSubmitting(false);
                setIsVerified(true);
            } else {
                console.error('Failed to get reCAPTCHA token');
                setIsVerified(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsVerified(false);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
                <Form className="flex flex-col items-center justify-center space-y-4 mt-6">
                    <div className="w-72 mb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            First Name
                        </label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="w-72 mb-2">
                        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Last Name
                        </label>
                        <Field
                            type="text"
                            id="surname"
                            name="surname"
                            placeholder="Doe"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="w-72 mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@acme.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    >
                        Confirm My Assistant
                    </button>
                </Form>
            )}
        </Formik>
    );
};

const GuestFormWrapper: React.FC = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
            <GuestForm />
        </GoogleReCaptchaProvider>
    );
};

export default GuestFormWrapper;
