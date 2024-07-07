interface Values {
    name: string;
    email: string;
}

export const sendEmail = async (values: Values) => {
    try {

        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                name: values.name,
            }),
        });

        // handle success
        if (response.ok) {
            console.log("Email Sent Successfully!");
        } else {
            console.error("There was a problem sending email. Pls try again!", response.statusText, response.status, response.body);
        }
    } catch (error) {
        console.log("Error sending email:", error);
        console.error("There was a problem sending email. Pls try again!");
    } finally {
        console.log("Email sent successfully!")
    }
};
