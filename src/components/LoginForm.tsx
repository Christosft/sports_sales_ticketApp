import {z} from "zod";
import {useState} from "react";
import {useNavigate} from "react-router";

const formSchema = z.object({
    email: z.string().trim().nonempty("Email is required").email("Email is invalid"),
    password: z.string().trim().nonempty("Password is required"),
})

type FormValues = z.infer<typeof formSchema>;

type FormErrors = {
    email?: string,
    password?: string,
}

const initialValues = {
    email: "",
    password: "",
}


const LoginForm = () => {

    const[values, setValues] = useState<FormValues>(initialValues);
    const[errors, setErrors] = useState<FormErrors | null>(null);
    const[loginData, setLoginData] = useState<FormValues | null>(null);

    const validateForm = (values: FormValues) => {
        const errors: FormErrors = {};

        if (!values.email.trim()) {
            errors.email = "Email is required";
        }

        if (values.password.length < 8) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoginData(values);
        setValues(initialValues);
        setErrors(null);

        navigate("/home")
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
            setLoginData(null);
        }

    return (
        <>
            <div className="flex max-w-sm mx-auto mt-8">
                <div>
                    <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
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
                        <h1 className="font-bold">PASSWORD</h1>
                        <input
                        type="password"
                        name="password"
                        placeholder="Password is required"
                        value={values.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border-black border-3" />

                        {errors?.password && (
                            <p className="text-red-600">{errors.password}</p>
                        )}
                    </div>

                     <button
                         type="submit"
                         className="bg-black text-white px-4 py-2 rounded ml-5">
                         Login
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
export default LoginForm;