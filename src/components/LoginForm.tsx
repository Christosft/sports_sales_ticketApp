import {z} from "zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().trim().nonempty("Email is required").email("Email is invalid"),
    password: z.string().trim().nonempty("Password is required"),
})

type FormValues = z.infer<typeof formSchema>;

const initialValues = {
    email: "",
    password: "",
}


const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const navigate = useNavigate();

    const onLogin = async (data: FormValues) => {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Φύλαξε το token στο localStorage
            localStorage.setItem("token", result.token);

            // Optional: Φύλαξε και στοιχεία χρήστη
            localStorage.setItem("user", JSON.stringify(result.user));

            alert("Login successful!");
            reset();
            navigate("/home");
        } catch (err: any) {
            alert(err.message || "Something went wrong.");
        }
    };

        const onClear = () => {
            reset();
        }

    return (
        <>
            <div className="flex max-w-sm mx-auto mt-8">
                <div>
                    <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Login</h1>
                    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                    <div>
                        <h1 className="font-bold">Email</h1>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Email is required"
                            autoComplete="off"
                            className="w-full px-4 py-2 rounded border-3 border-black" />

                        {errors?.email && (
                            <p className="text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold">Password</h1>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password is required"
                            className="w-full px-4 py-2 rounded border-black border-3"
                            autoComplete="off"/>

                        {errors?.password && (
                            <p className="text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                     <button
                         type="submit"
                         className="bg-black text-white px-4 py-2 rounded ml-5">
                         Login
                     </button>

                        <button
                            type="button"
                            onClick={onClear}
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