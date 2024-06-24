'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { sendEmail } from '@/api/sendEmail';
import { createGuest } from '@/api/createGuest';
import AddToCalendar from '@/api/AddToCalendar';

interface Values {
    name: string;
    surname: string;
    email: string;
    token: string;
    assistance: string;
    accompanist: string;
    recaptchaToken: string;
    bus: string;
    allergies: string;
    allergyDetails: string;
    comments: string;
}

const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
};

const GuestForm: React.FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isVerified, setIsVerified] = useState(true);

    const initialValues: Values = {
        name: '',
        surname: '',
        email: '',
        token: generateToken(),
        assistance: '',
        accompanist: '',
        recaptchaToken: '',
        bus: '',
        allergies: '',
        allergyDetails: '',
        comments: '',
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
            {({ values }) => (
                <Form className="flex flex-col items-center justify-center space-y-4 mt-6">
                    <div className="w-72 mb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            First Name
                        </label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            className="input-field bg-gray-800 text-white"
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
                            placeholder="Apellidos"
                            className="input-field bg-gray-800 text-white"
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
                            placeholder="mail"
                            className="input-field bg-gray-800 text-white"
                        />
                    </div>

                    <div className="w-72 mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Will you attend?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="radio" name="assistance" value="yes" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.assistance === 'yes' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.assistance === 'yes' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="assistance" value="no" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.assistance === 'no' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.assistance === 'no' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                    </div>

                    {values.assistance === 'yes' && (
                        <>
                            <AddToCalendar />
                            <div className="w-72 mb-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Will you use the bus?
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <Field type="radio" name="bus" value="yes" className="hidden" />
                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.bus === 'yes' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                            {values.bus === 'yes' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="bus" value="no" className="hidden" />
                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.bus === 'no' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                            {values.bus === 'no' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm">No</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="w-72 mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Do you have any allergies?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="radio" name="allergies" value="yes" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.allergies === 'yes' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.allergies === 'yes' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="allergies" value="no" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.allergies === 'no' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.allergies === 'no' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                    </div>

                    {values.allergies === 'yes' && (
                        <div className="w-72 mb-2">
                            <label htmlFor="allergyDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Please specify your allergies
                            </label>
                            <Field
                                as="textarea"
                                id="allergyDetails"
                                name="allergyDetails"
                                placeholder="List your allergies"
                                className="input-field bg-gray-800 text-white"
                            />
                        </div>
                    )}

                    <div className="w-72 mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Will you be accompanied?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="radio" name="accompanist" value="yes" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.accompanist === 'yes' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.accompanist === 'yes' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="accompanist" value="no" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.accompanist === 'no' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.accompanist === 'no' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                    </div>

                    <div className="w-72 mb-2">
                        <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Comments
                        </label>
                        <Field
                            as="textarea"
                            id="comments"
                            name="comments"
                            placeholder="Any additional information"
                            className="input-field bg-gray-800 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="button-submit"
                    >
                        Confirm My Attendance
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
