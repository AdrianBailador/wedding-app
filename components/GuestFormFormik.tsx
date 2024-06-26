

    'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
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
    assistance: string | null;
    accompanist: string | null;
    recaptchaToken: string;
    bus: string | null;
    allergies: string | null;
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
        assistance: null,
        accompanist: null,
        recaptchaToken: '',
        bus: null,
        allergies: null,
        allergyDetails: '',
        comments: '',
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        surname: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        assistance: Yup.boolean().required('Required'),
        accompanist: Yup.boolean().required('Required'),
        allergies: Yup.boolean().required('Required'),
        bus: Yup.boolean().required("A radio option is required"),
        allergyDetails: Yup.string().required('Required'),
    });

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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched }) => (
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
                        {errors.name && touched.name ? <div className="text-red-500">{errors.name}</div> : null}
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
                        {errors.surname && touched.surname ? <div className="text-red-500">{errors.surname}</div> : null}
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
                        {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
                    </div>

                    <div className="w-72 mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Will you attend?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="radio" name="assistance" value="true" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.assistance === 'true' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.assistance === 'true' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="assistance" value="false" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.assistance === 'false' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.assistance === 'false' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                        {errors.assistance && touched.assistance ? <div className="text-red-500">{errors.assistance}</div> : null}
                    </div>

                    {values.assistance === 'true' && (
                        <>
                            <AddToCalendar />
                            <div className="w-72 mb-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Will you use the bus?
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <Field type="radio" name="bus" value="true" className="hidden" />
                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.bus === 'true' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                            {values.bus === 'true' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="bus" value="false" className="hidden" />
                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.bus === 'false' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                            {values.bus === 'false' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm">No</span>
                                    </label>
                                </div>
                                {errors.bus && touched.bus ? <div className="text-red-500">{errors.bus}</div> : null}
                            </div>
                        </>
                    )}

                    <div className="w-72 mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Will you have an accompanist?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="radio" name="accompanist" value="true" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.accompanist === 'true' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.accompanist === 'true' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="accompanist" value="false" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.accompanist === 'false' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.accompanist === 'false' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                        {errors.accompanist && touched.accompanist ? <div className="text-red-500">{errors.accompanist}</div> : null}
                    </div>

                    <div className="w-72 mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Do you have any allergies?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="radio" name="allergies" value="true" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.allergies === 'true' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.allergies === 'true' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <Field type="radio" name="allergies" value="false" className="hidden" />
                                <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.allergies === 'false' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                    {values.allergies === 'false' && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                        {errors.allergies && touched.allergies ? <div className="text-red-500">{errors.allergies}</div> : null}
                    </div>

                    {values.allergies === 'true' && (
                        <div className="w-72 mb-2">
                            <label htmlFor="allergyDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Please specify your allergies
                            </label>
                            <Field
                                type="text"
                                id="allergyDetails"
                                name="allergyDetails"
                                placeholder="Details"
                                className="input-field bg-gray-800 text-white"
                            />
                            {errors.allergyDetails && touched.allergyDetails ? <div className="text-red-500">{errors.allergyDetails}</div> : null}
                        </div>
                    )}

                    <div className="w-72 mb-2">
                        <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Comments
                        </label>
                        <Field
                            as="textarea"
                            id="comments"
                            name="comments"
                            placeholder="Comments"
                            className="input-field bg-gray-800 text-white"
                        />
                        {errors.comments && touched.comments ? <div className="text-red-500">{errors.comments}</div> : null}
                    </div>

                    {!isVerified && <div className="text-red-500">Please complete the reCAPTCHA verification</div>}

                    <button
                        type="submit"
                        className="w-72 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

const WrappedGuestForm: React.FC = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
            <GuestForm />
        </GoogleReCaptchaProvider>
    );
};

export default WrappedGuestForm;
