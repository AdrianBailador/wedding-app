'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Yup from 'yup';
import { sendEmail } from "@/api/emails/sendEmail";
import { createGuest } from "@/api/fb-database/createGuest";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";
import {Label} from "@/components/ui/label";
import InputField from "@/components/InputField";
import {useLocale, useTranslations} from "next-intl";

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

const GuestFormFormikEs: React.FC = () => {
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
        title: "Boda de Adrian y Ana",
        description: "Boda de Adrian y Ana",
        location: "Iglesia de San Francisco, Priego de Córdoba",
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

    const detailsWithContacts = `${description}\n\nContactos:\nAna: ${contacts.ana}\nAdrian: ${contacts.adrian}\n\nCuentas Bancarias:\nAna: ${bankAccounts.ana}\nAdrian: ${bankAccounts.adrian}`;

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

    const t = useTranslations('IndexPage');
    const locale = useLocale();

    return (
        <div className="w-full flex justify-center bg-white py-8 px-8">
            {!formSubmitted ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, errors, touched }) => (
                        <Form className="flex flex-col space-y-4">
                            <Alert className="my-8">
                                <AlertDescription>
                                    {t('form.warning')} <b>SPAM.</b>
                                </AlertDescription>
                            </Alert>

                            {/*Input group*/}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label={t('form.NameInput.label')} type="text" id="name" name="name" placeholder={t('form.NameInput.placeholder')}>
                                    {errors.name && touched.name ?
                                        <div className="text-sm text-red-500">{errors.name}</div> : null}
                                </InputField>

                                <InputField label={t('form.LastNameInput.label')} type={"text"} id={"surname"} name={"surname"} placeholder={t('form.LastNameInput.placeholder')}>
                                    {errors.surname && touched.surname ?
                                        <div className="text-sm text-red-500">{errors.surname}</div> : null}
                                </InputField>
                            </div>

                            {/*Input Email*/}
                            <InputField label={t('form.EmailInput.label')} type={"email"} id={"email"} name={"email"} placeholder={t('form.EmailInput.placeholder')}>
                                {errors.email && touched.email ?
                                    <div className="text-sm text-red-500">{errors.email}</div> : null}
                            </InputField>

                            <div className="w-full flex flex-col">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {t('form.AssistanceRadioButton.label')}
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <Field type="radio" name="assistance" value="true" className="hidden"/>
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.assistance === 'true' ? 'bg-accent border-blue-500' : ''}`}>
                                            {values.assistance === 'true' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm">
                                            {t('form.AssistanceRadioButton.yes')}
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="assistance" value="false" className="hidden"/>
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.assistance === 'false' ? 'bg-accent border-blue-500' : ''}`}>
                                            {values.assistance === 'false' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm">
                                            {t('form.AssistanceRadioButton.no')}
                                        </span>
                                    </label>
                                </div>
                                {errors.assistance && touched.assistance ?
                                    <div className="text-red-500">{errors.assistance}</div> : null}
                            </div>


                            {values.assistance === 'true' && (
                                <>
                                    {/*Public Transport Radio Buttons*/}
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="bus"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {t('form.BusServiceRadioButton.label')}
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <Field type="radio" name="bus" value="yes" className="hidden"/>
                                                <div
                                                    className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.bus === 'yes' ? 'bg-accent border-blue-500' : ''}`}>
                                                    {values.bus === 'yes' && (
                                                        <svg className="w-4 h-4 text-white" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm">
                                                    {t('form.BusServiceRadioButton.yes')}
                                                </span>
                                            </label>
                                            <label className="flex items-center">
                                                <Field type="radio" name="bus" value="no" className="hidden"/>
                                                <div
                                                    className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.bus === 'no' ? 'bg-accent border-blue-500' : ''}`}>
                                                    {values.bus === 'no' && (
                                                        <svg className="w-4 h-4 text-white" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm">
                                                    {t('form.BusServiceRadioButton.no')}
                                                </span>
                                            </label>
                                        </div>
                                        {errors.bus && touched.bus ?
                                            <div className="text-red-500">{errors.bus}</div> : null}
                                    </div>

                                    {/*Guest Radio Buttons Section*/}
                                    <div className="form-section p-4 border border-accent rounded-xl">
                                        <h5 className="form-section-title font-semibold mb-4">
                                            {t('form.GuestsSection.title')}
                                        </h5>
                                        <div className="form-section-content flex flex-col gap-4">
                                            <div className="w-full flex flex-col">
                                                <label htmlFor="accompanist"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {t('form.GuestsSection.guestRadioButton.label')}
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="accompanist" value="yes"
                                                               className="hidden"/>
                                                        <div
                                                            className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.accompanist === 'yes' ? 'bg-accent border-blue-500' : ''}`}>
                                                            {values.accompanist === 'yes' && (
                                                                <svg className="w-4 h-4 text-white" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm">
                                                            {t('form.GuestsSection.guestRadioButton.yes')}
                                                        </span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="accompanist" value="no"
                                                               className="hidden"/>
                                                        <div
                                                            className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.accompanist === 'no' ? 'bg-accent border-blue-500' : ''}`}>
                                                            {values.accompanist === 'no' && (
                                                                <svg className="w-4 h-4 text-white" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm">
                                                            {t('form.GuestsSection.guestRadioButton.no')}
                                                        </span>
                                                    </label>
                                                </div>
                                                {errors.accompanist && touched.accompanist ?
                                                    <div className="text-red-500">{errors.accompanist}</div> : null}
                                            </div>

                                            {values.accompanist === 'yes' && (
                                                <>
                                                    <InputField label={t('form.GuestsSection.guestsNamesInput.label')} type={"text"} id={"accompanistName"} name={"accompanistName"} placeholder={t('form.GuestsSection.guestsNamesInput.placeholder')}>
                                                        {errors.accompanistName && touched.accompanistName ?
                                                            <div
                                                                className="text-red-500">{errors.accompanistName}</div> : null}
                                                    </InputField>

                                                    <div className="w-full flex flex-col">
                                                        <label htmlFor="children"
                                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            {t('form.GuestsSection.guestsChildrenRadioButton.label')}
                                                        </label>
                                                        <div className="flex items-center space-x-4">
                                                            <label className="flex items-center">
                                                                <Field type="radio" name="children" value="yes"
                                                                       className="hidden"/>
                                                                <div
                                                                    className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.children === 'yes' ? 'bg-accent border-blue-500' : ''}`}>
                                                                    {values.children === 'yes' && (
                                                                        <svg className="w-4 h-4 text-white" fill="none"
                                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                                <span className="text-sm">
                                                                    {t('form.GuestsSection.guestsChildrenRadioButton.yes')}
                                                                </span>
                                                            </label>
                                                            <label className="flex items-center">
                                                                <Field type="radio" name="children" value="no"
                                                                       className="hidden"/>
                                                                <div
                                                                    className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.children === 'no' ? 'bg-accent border-blue-500' : ''}`}>
                                                                    {values.children === 'no' && (
                                                                        <svg className="w-4 h-4 text-white" fill="none"
                                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                                <span className="text-sm">
                                                                    {t('form.GuestsSection.guestsChildrenRadioButton.no')}
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {errors.children && touched.children ?
                                                            <div className="text-red-500">{errors.children}</div> : null}
                                                    </div>

                                                    {values.children === 'yes' && (
                                                        <InputField label={t('form.GuestsSection.guestsChildrenNamesInput.label')} type={"text"} id={"childrenNames"} name={"childrenNames"} placeholder={t('form.GuestsSection.guestsChildrenNamesInput.placeholder')}>
                                                            {errors.childrenNames && touched.childrenNames ? <div
                                                                className="text-red-500">{errors.childrenNames}</div> : null}
                                                        </InputField>
                                                    )}


                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/*Allergies Section*/}
                                    <div className="form-section p-4 border border-accent rounded-xl">
                                        <h5 className="form-section-title font-semibold mb-4">
                                            {t('form.AllergiesSection.title')}
                                        </h5>
                                        <div className="flex flex-col gap-4">
                                            <div className="w-full flex flex-col">
                                                <label htmlFor="allergies"
                                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {t('form.AllergiesSection.allergyRadioButton.label')}
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="allergies" value="yes"
                                                               className="hidden"/>
                                                        <div
                                                            className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.allergies === 'yes' ? 'bg-accent border-blue-500' : ''}`}>
                                                            {values.allergies === 'yes' && (
                                                                <svg className="w-4 h-4 text-white" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm">
                                                            {t('form.AllergiesSection.allergyRadioButton.yes')}
                                                        </span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <Field type="radio" name="allergies" value="no" className="hidden"/>
                                                        <div
                                                            className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2 ${values.allergies === 'no' ? 'bg-accent border-blue-500' : ''}`}>
                                                            {values.allergies === 'no' && (
                                                                <svg className="w-4 h-4 text-white" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-sm">
                                                            {t('form.AllergiesSection.allergyRadioButton.no')}
                                                        </span>
                                                    </label>
                                                </div>
                                                {errors.allergies && touched.allergies ?
                                                    <div className="text-red-500">{errors.allergies}</div> : null}
                                            </div>

                                            {values.allergies === 'yes' && (
                                                <div className="w-full">
                                                    <InputField label={t('form.AllergiesSection.allergiesInput.label')} type={"text"} id={"allergyDetails"} name={"allergyDetails"} placeholder={t('form.AllergiesSection.allergiesInput.placeholder')}>
                                                        {errors.allergyDetails && touched.allergyDetails ?
                                                            <div className="text-red-500">{errors.allergyDetails}</div> : null}
                                                    </InputField>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-section p-4 border border-accent rounded-xl">
                                        <h5 className="form-section-title font-semibold mb-4">
                                            {t('form.CommentsSection.title')}
                                        </h5>
                                        <div className="form-section-content flex flex-col gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <label htmlFor="surname"
                                                       className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {t('form.CommentsSection.commentsInput.label')}
                                                </label>
                                                <textarea rows={4} id="comments" name="comments" placeholder={t('form.CommentsSection.commentsInput.placeholder')}
                                                          className="px-3 py-2 rounded-xl border border-border bg-white text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 autofill:bg-background">
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}

                            <div className="w-full flex justify-center items-center py-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-3 bg-white text-button-bg-foreground  border border-accent rounded-lg hover:bg-border uppercase"
                                >
                                    {t('form.SubmitButton')}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            ) : (

                <div className="text-center mt-8 px-4">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2 className="text-2xl font-semibold mb-4">Gracias por su respuesta!</h2>
                    {assistanceConfirmed ? (
                        <p className="mb-4">
                            Esperamos verle en nuestra boda. Recibirá un email con los detalles de la boda, por favor,
                            revise la carpeta de SPAM.
                        </p>
                    ) : (
                        <p className="mb-4">Lamentamos que no pueda venir. Recibirá un email con los detalles de la
                            boda, por favor, revise la carpeta de SPAM, que puede ignorar</p>
                    )}

                    <div className="mt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-2">
                        <a
                            href={googleCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Añadir a Google Calendar
                        </a>
                        <a
                            href={outlookCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600"
                        >
                            Añadir a Outlook Calendar
                        </a>
                        <a
                            href={icsUrl}
                            download="event.ics"
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Descargar ICS
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
            <GuestFormFormikEs/>
        </GoogleReCaptchaProvider>
    );
};

export default WrappedGuestForm;


