import {z} from "zod";
import {useState} from "react";
import {useNavigate} from "react-router";

const formSchema = z.object({
    firstname: z.string().trim().nonempty("firstname is required"),
    lastname: z.string().trim().nonempty("lastname is required"),
    email: z.string().trim().nonempty("Email is required").email("Email is invalid"),
    address: z.string().trim().nonempty("address is required"),
    province: z.string().trim().nonempty("province is required"),
    city: z.string().trim().nonempty("city is required"),
    country: z.string().trim().nonempty("country is required"),
    phoneNumber: z.string().trim().nonempty("phone is required"),
})

type FormValues = z.infer<typeof formSchema>;

type FormErrors = {
    firstname?: string,
    lastname?: string,
    email?: string,
    address?: string,
    province?: string,
    city?: string,
    country?: string,
    phoneNumber?: string,
}

const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    province: "",
    city: "",
    country: "",
    phoneNumber: "",
}


const RegisterForm = () => {

    const[values, setValues] = useState<FormValues>(initialValues);
    const[errors, setErrors] = useState<FormErrors | null>(null);
    const[registerData, setRegisterData] = useState<FormValues | null>(null);

    const validateForm = (values: FormValues) => {
        const errors: FormErrors = {};

        if (!values.firstname.trim()) {
            errors.firstname = "Email is required";
        }

        if (!values.lastname.trim()) {
            errors.lastname = "Email is required";
        }

        if (!values.email.trim()) {
            errors.email = "Email is required";
        }

        if (!values.address.trim()) {
            errors.address = "Address is required";
        }

        if (!values.province.trim()) {
            errors.province = "Province is required";
        }

        if (!values.city.trim()) {
            errors.city = "City is required";
        }

        if (!values.country.trim()) {
            errors.country = "Country is required";
        }

        if (!values.phoneNumber.trim()) {
            errors.phoneNumber = "Phone is required";
        }

        return errors;
    };

    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setRegisterData(values);
        setValues(initialValues);
        setErrors(null);

        navigate("/landing/login")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setValues(
            (prev => ({
                ...prev,
                [name]: value,
            }))
        )
        setErrors(
            (prev => ({
                ...prev,
                [name]: undefined,
            }))
        )
    }

        const handleClear = () => {
            setValues(initialValues);
            setErrors(null);
            setRegisterData(null);
        }

    return (
        <>
            <div className="flex max-w-sm mx-auto mt-8">
                <div>
                    <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Register</h1>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <h1 className="font-bold">FIRSTNAME</h1>
                            <input
                                type="text"
                                name="firstname"
                                value={values.firstname}
                                placeholder="Firstname is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.firstname && (
                                <p className="text-red-600">{errors.firstname}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">LASTNAME</h1>
                            <input
                                type="text"
                                name="lastname"
                                value={values.lastname}
                                placeholder="Lastname is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.lastname && (
                                <p className="text-red-600">{errors.lastname}</p>
                            )}
                        </div>

                    <div>
                        <h1 className="font-bold">EMAIL</h1>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder="Email is required"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border-3 border-black" />

                        {errors?.email && (
                            <p className="text-red-600">{errors.email}</p>
                        )}
                    </div>

                        <div>
                            <h1 className="font-bold">ADDRESS</h1>
                            <input
                                type="text"
                                name="address"
                                value={values.address}
                                placeholder="Address is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.email && (
                                <p className="text-red-600">{errors.address}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">PROVINCE</h1>
                            <input
                                type="text"
                                name="province"
                                value={values.province}
                                placeholder="Province is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.province && (
                                <p className="text-red-600">{errors.province}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">CITY</h1>
                            <input
                                type="text"
                                name="city"
                                value={values.city}
                                placeholder="City is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.city && (
                                <p className="text-red-600">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">Country</h1>
                            <input
                                type="text"
                                name="country"
                                value={values.country}
                                placeholder="Email is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.country && (
                                <p className="text-red-600">{errors.country}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">PHONENUMBER</h1>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                placeholder="Phone number is required"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.phoneNumber && (
                                <p className="text-red-600">{errors.phoneNumber}</p>
                            )}
                    </div>

                     <button
                         type="submit"
                         className="bg-black text-white px-4 py-2 rounded ml-5">
                         Submit
                     </button>

                        <button
                            type="reset"
                            onClick={handleClear}
                            className="bg-black text-white px-4 py-2 rounded ml-5">
                            Clear
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default RegisterForm;