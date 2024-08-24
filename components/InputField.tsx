import React from 'react';
import {Field} from "formik";

interface InputFieldProps {
    label:string;
    type: string;
    id: string;
    name:string;
    placeholder:string;
    children: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({label, placeholder, type, name, id, children}) => {
    return (
        <div className="w-full flex flex-col gap-1 ">
            <label htmlFor="surname"
                   className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
            </label>
            <Field
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="flex h-12 w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 autofill:bg-background"
            />
            {children}
        </div>
    );
};

export default InputField;