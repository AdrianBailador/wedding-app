'use client'

import {Field, Form, Formik, FormikHelpers} from "formik";
import {createGuest} from "@/api/createGuest";
import {sendEmail} from "@/api/sendEmail";

interface Values {
    name: string;
    surname: string;
    email: string;
    token: string;
    assistance: false;
    accompanist: false;
}

const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
};

const GuestFormFormik = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    token: generateToken(),
                    assistance: false,
                    accompanist: false,
                }}
                onSubmit={(values: Values, {setSubmitting}: FormikHelpers<Values>) => {
                    const docId = createGuest(values);
                    console.log("Guest created successfully with ID:", docId);
                    setSubmitting(false);
                    const resendEmail = sendEmail(values);
                }}
            >
                <Form className="flex flex-col items-center justify-center space-y-4 mt-6">
                    <div className="w-72 mb-2">
                        <label
                            className={"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300\""}
                            htmlFor="name"
                        >
                            First Name
                        </label>
                        <Field
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            id="name"
                            name="name"
                            placeholder="John"
                        />
                    </div>

                    <div className="w-72 mb-2">
                        <label
                            className={"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300\""}
                            htmlFor="surname"
                        >Last Name
                        </label>
                        <Field
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            id="surname"
                            name="surname"
                            placeholder="Doe"
                        />
                    </div>

                    <div className="w-72 mb-2">
                        <label
                            className={"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300\""}
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <Field
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            id="email"
                            name="email"
                            placeholder="john@acme.com"
                            type="email"
                        />
                    </div>

                    <button
                        className={"align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"}
                        type="submit"
                    >
                        Confirm My Assistant
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default GuestFormFormik;