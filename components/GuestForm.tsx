import {createGuest} from "@/api/fb-database/createGuest";

const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
};

const GuestForm = () => {
    const handleSubmit = async (formData: any) => {
        "use server"
        const newGuest = {
            name: formData.get('name'),
            surname: formData.get('surname'),
            email: formData.get('email'),
            token: generateToken(),
            assistance: false,
            accompanist: false,
        };
        const docId = createGuest(newGuest);

        console.log("Guest created successfully with ID:", docId);

    }

    return (
        <div>
            <form
                className="flex flex-col items-center justify-center space-y-4 mt-6"
                action={handleSubmit}>
                <div className="w-72 mb-2">
                    <div className="relative h-10 w-full min-w-[200px] ">
                        <input
                            name={"name"}
                            type="text"
                            placeholder="First Name"
                            className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"/>
                    </div>
                </div>
                <div className="w-72 mb-2">
                    <div className="relative h-10 w-full min-w-[200px] ">
                        <input
                            name={"surname"}
                            type="text"
                            placeholder="Last Name"
                            className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"/>
                    </div>
                </div>
                <div className="w-72 mb-2">
                    <div className="relative h-10 w-full min-w-[200px] ">
                        <input
                            name={"email"}
                            type="email"
                            placeholder="Email Address"
                            className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"/>
                    </div>
                </div>
                <button
                    className={"align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"}
                    type="submit">Confirm My Ais
                </button>
            </form>
        </div>
    )
        ;
}

export default GuestForm;