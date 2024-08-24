'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Yup from 'yup';
import { sendEmail } from "@/api/emails/sendEmail";
import { createGuest } from "@/api/fb-database/createGuest";

interface Values {
    name: string;
    surname: string;
    email: string;
    token: string;
    assistance: string;
    accompanist: string;
    accompanistName: string;
    children: string;
    childrenNames: string;
    recaptchaToken: string;
    bus: string;
    allergies: string;
    allergyDetails: string;
    comments: string;
}

const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
};

const GuestFormFormik: React.FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isVerified, setIsVerified] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [assistanceConfirmed, setAssistanceConfirmed] = useState<boolean | null>(null);

    const initialValues: Values = {
        name: '',
        surname: '',
        email: '',
        token: generateToken(),
        assistance: '',
        accompanist: '',
        accompanistName: '',
        children: '',
        childrenNames: '',
        recaptchaToken: '',
        bus: '',
        allergies: '',
        allergyDetails: '',
        comments: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        surname: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        assistance: Yup.string().required('Required'),
        accompanist: Yup.string().when('assistance', {
            is: 'true',
            then: () => Yup.string().required('This field is required'),
        }),
        accompanistName: Yup.string().when('accompanist', {
            is: 'yes',
            then: () => Yup.string().required('This field is required'),
        }),
        children: Yup.string().when('accompanist', {
            is: 'yes',
            then: () => Yup.string().required('This field is required'),
        }),
        childrenNames: Yup.string().when('children', {
            is: 'yes',
            then: () => Yup.string().required('This field is required'),
        }),
        bus: Yup.string().when('assistance', {
            is: 'true',
            then: () => Yup.string().required('This field is required'),
        }),
        allergies: Yup.string().when('assistance', {
            is: 'true',
            then: () => Yup.string().required('This field is required'),
        }),
        allergyDetails: Yup.string().when('allergies', {
            is: 'yes',
            then: () => Yup.string().required('This field is required'),
        }),
        comments: Yup.string().notRequired()
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
                setFormSubmitted(true);  // Show confirmation message
                setAssistanceConfirmed(values.assistance === 'true');
            } else {
                console.error('Failed to get reCAPTCHA token');
                setIsVerified(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsVerified(false);
        }
    };

    const event = {
        title: "Adrian and Ana's Wedding",
        description: "Adrian and Ana's Wedding",
        location: "Church of San Francisco, Priego de Córdoba",
        startTime: "2024-10-12T12:00:00",
        endTime: "2024-10-12T13:00:00",
        contacts: {
            ana: process.env.NEXT_PUBLIC_ANA_CONTACT,
            adrian: process.env.NEXT_PUBLIC_ADRIAN_CONTACT
        },
        bankAccounts: {
            ana: process.env.NEXT_PUBLIC_ANA_BANK_ACCOUNT,
            adrian: process.env.NEXT_PUBLIC_ADRIAN_BANK_ACCOUNT
        }
    };

    const { title, description, location, startTime, endTime, contacts, bankAccounts } = event;

    const start = new Date(startTime).toISOString().replace(/-|:|\.\d+/g, '');
    const end = new Date(endTime).toISOString().replace(/-|:|\.\d+/g, '');

    const detailsWithContacts = `${description}\n\nContacts:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}\n\nBank Accounts:\nAna: ${bankAccounts.ana}\nAdrian: ${bankAccounts.adrian}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(detailsWithContacts)}&location=${encodeURIComponent(location)}`;

    const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(detailsWithContacts)}&startdt=${startTime}&enddt=${endTime}&location=${encodeURIComponent(location)}`;

    const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${title}
    DESCRIPTION:${detailsWithContacts}
    LOCATION:${location}
    DTSTART:${start}
    DTEND:${end}
    END:VEVENT
    END:VCALENDAR`;
    const icsFile = new Blob([icsContent], { type: 'text/calendar' });
    const icsUrl = URL.createObjectURL(icsFile);

    // Aquí no imprimimos los detalles sensibles
    console.log('Google Calendar URL:', googleCalendarUrl);
    console.log('Outlook Calendar URL:', outlookCalendarUrl);
    console.log('ICS URL:', icsUrl);

    return (
        <div className="flex justify-center h-screen">
            {!formSubmitted ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, errors, touched }) => (
                        <Form className="flex flex-col items-center space-y-4">
                            <div className="w-72">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                    style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                />
                                {errors.name && touched.name ? <div className="text-red-500">{errors.name}</div> : null}
                            </div>

                            <div className="w-72">
                                <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Last Name
                                </label>
                                <Field
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    placeholder="Surname"
                                    className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                    style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                />
                                {errors.surname && touched.surname ? <div className="text-red-500">{errors.surname}</div> : null}
                            </div>

                            <div className="w-72">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                    style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                />
                                {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
                            </div>

                            <div className="w-72 flex flex-col items-center">
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                                    <div className="w-72 flex flex-col items-center">
                                        <label htmlFor="accompanist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm">No</span>
                                            </label>
                                        </div>
                                        {errors.accompanist && touched.accompanist ? <div className="text-red-500">{errors.accompanist}</div> : null}
                                    </div>

                                    {values.accompanist === 'yes' && (
                                        <>
                                            <div className="w-72 flex flex-col items-center">
                                                <label htmlFor="accompanistName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Name of the Accompanist
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="accompanistName"
                                                    name="accompanistName"
                                                    placeholder="Name of the Accompanist"
                                                    className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                                    style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                                />
                                                {errors.accompanistName && touched.accompanistName ? <div className="text-red-500">{errors.accompanistName}</div> : null}
                                            </div>

                                            <div className="w-72 flex flex-col items-center">
                                                <label htmlFor="children" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Will you be bringing children?
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="children" value="yes" className="hidden" />
                                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.children === 'yes' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                                            {values.children === 'yes' && (
                                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm">Yes</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="children" value="no" className="hidden" />
                                                        <div className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.children === 'no' ? 'bg-blue-500 border-blue-500' : ''}`}>
                                                            {values.children === 'no' && (
                                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm">No</span>
                                                    </label>
                                                </div>
                                                {errors.children && touched.children ? <div className="text-red-500">{errors.children}</div> : null}
                                            </div>

                                            {values.children === 'yes' && (
                                                <div className="w-72 flex flex-col items-center">
                                                    <label htmlFor="childrenNames" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Names of the Children
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="childrenNames"
                                                        name="childrenNames"
                                                        placeholder="Names of the Children"
                                                        className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                                        style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                                    />
                                                    {errors.childrenNames && touched.childrenNames ? <div className="text-red-500">{errors.childrenNames}</div> : null}
                                                </div>
                                            )}


                                        </>
                                    )}

                                    <div className="w-72 flex flex-col items-center">
                                        <label htmlFor="bus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Will you use the bus service?
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
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm">No</span>
                                            </label>
                                        </div>
                                        {errors.bus && touched.bus ? <div className="text-red-500">{errors.bus}</div> : null}
                                    </div>

                                    <div className="w-72 flex flex-col items-center">
                                        <label htmlFor="allergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm">No</span>
                                            </label>
                                        </div>
                                        {errors.allergies && touched.allergies ? <div className="text-red-500">{errors.allergies}</div> : null}
                                    </div>

                                    {values.allergies === 'yes' && (
                                        <div className="w-72">
                                            <label htmlFor="allergyDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Please provide details
                                            </label>
                                            <Field
                                                type="text"
                                                id="allergyDetails"
                                                name="allergyDetails"
                                                placeholder="Details of allergies"
                                                className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                                style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                            />
                                            {errors.allergyDetails && touched.allergyDetails ? <div className="text-red-500">{errors.allergyDetails}</div> : null}
                                        </div>
                                    )}

                                    <div className="w-72 flex flex-col items-center">
                                        <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Additional comments
                                        </label>
                                        <Field
                                            type="text"
                                            id="comments"
                                            name="comments"
                                            placeholder="Additional comments"
                                            className="input-field bg-gray-800 text-white border border-gray-600 rounded-lg pl-2"
                                            style={{ backgroundColor: "#F6F4EC", color: "#545748", borderColor: "#A0A48E", borderWidth: "2px" }}
                                        />
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-200"
                                style={{ backgroundColor: "#FFFFFF00", color: "#DE967D", borderColor: "#DE967D", borderWidth: "2px" }}
                            >
                                Submit
                            </button>
                            <p className="mb-4">
                                We look forward to seeing you at our wedding. You will receive an email with the wedding details, please check your <b>SPAM</b> folder.
                            </p>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="text-center mt-8 px-4">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2 className="text-2xl font-semibold mb-4">Thank you for your response!</h2>
                    {assistanceConfirmed ? (
                        <p>We look forward to seeing you at the event. You will receive an email with the wedding details, please check your SPAM folder.</p>
                    ) : (
                        <p>We are sorry you can not make it. You will receive an email with the wedding details, please check the SPAM folder, which you can ignore.</p>
                    )}

                    <div className="mt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-2 justify-center">
                        <a
                            href={googleCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-200"
                            style={{ backgroundColor: "#FFFFFF00", color: "#DE967D", borderColor: "#DE967D", borderWidth: "2px" }}
                        >
                            Add to Google Calendar
                        </a>
                        <a
                            href={outlookCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-200"
                            style={{ backgroundColor: "#FFFFFF00", color: "#DE967D", borderColor: "#DE967D", borderWidth: "2px" }}
                        >
                            Add to Google Calendar
                        </a>
                        <a
                            href={icsUrl}
                            download="event.ics"
                            className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-200"
                            style={{ backgroundColor: "#FFFFFF00", color: "#DE967D", borderColor: "#DE967D", borderWidth: "2px" }}
                        >
                            Download ICS
                        </a>
                    </div>
                </div>



            )}
        </div>
    );


};

const WrappedGuestForm: React.FC = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
            <GuestFormFormik />
        </GoogleReCaptchaProvider>
    );
};

export default WrappedGuestForm;


