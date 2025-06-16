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

    const onLogin = (data: FormValues) => {
        console.log(data);
        reset();


        navigate("/home")
    }

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
                        <h1 className="font-bold">EMAIL</h1>
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
                        <h1 className="font-bold">PASSWORD</h1>
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