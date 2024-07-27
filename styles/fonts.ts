import {Inter, Montserrat, Marcellus} from 'next/font/google';

// define your variable fonts
const montserrat = Montserrat({subsets: ['latin']});
const marcellus = Marcellus(
    {
        weight: ['400'],
        subsets: ["latin"],
    }
);

export { montserrat, marcellus }