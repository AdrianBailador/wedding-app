'use client';
import React from 'react';
import { useFormik } from 'formik';
import emailjs from 'emailjs-com';
import AddToCalendar from '../api/AddToCalendar';
import { createGuest } from '../api/createGuest';

const YOUR_EMAIL = 'adrianbailador@hotmail.com';
const YOUR_SERVICE_ID = '0fTgiWjStfSHXKWse';
const YOUR_TEMPLATE_ID = 'template_67juszb';
const YOUR_USER_ID = 'your_emailjs_user_id'; // Ensure you replace this with your actual EmailJS user ID

const generateToken = () => {
  return Math.random().toString(36).substr(2, 9);
};

const GuestForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      assistance: false,
      accompanist: false,
    },
    onSubmit: async (values) => {
      const newGuest = {
        ...values,
        photos: [],
        token: generateToken(),
        comment: ''
      };

      console.log("Submitting form with values:", newGuest);

      try {
        // Create a new guest in Firestore
        const docId = await createGuest(newGuest);
        console.log("Guest created successfully with ID:", docId);

        const emailParams = {
          to_email: values.email,
          name: values.name,
          surname: values.surname,
          assistance: values.assistance ? 'Yes' : 'No',
          accompanist: values.accompanist ? 'Yes' : 'No',
          token: newGuest.token
        };

        console.log("Sending email with params:", emailParams);

        // Send email to the recipient
        await emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, emailParams, YOUR_USER_ID);
        console.log("Email sent to guest");

        // Send email to your personal account
        await emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, { ...emailParams, to_email: YOUR_EMAIL }, YOUR_USER_ID);
        console.log("Email sent to personal account");

        alert("Guest created and emails sent successfully!");
      } catch (error) {
        console.error("Error adding document or sending emails:", error);
        alert("Error creating guest or sending emails. Please try again later.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Surname:
          <input type="text" name="surname" value={formik.values.surname} onChange={formik.handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Assistance:
          <input type="checkbox" name="assistance" checked={formik.values.assistance} onChange={formik.handleChange} />
        </label>
      </div>
      {formik.values.assistance && (
        <div>
          <h3>Add to Calendar</h3>
          <AddToCalendar event={{ title: 'Event Attendance', description: 'Event description', location: 'Event location', startTime: '2024-06-30T10:00:00', endTime: '2024-06-30T12:00:00' }} />
        </div>
      )}
      <div>
        <label>
          Accompanist:
          <input type="checkbox" name="accompanist" checked={formik.values.accompanist} onChange={formik.handleChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuestForm;
