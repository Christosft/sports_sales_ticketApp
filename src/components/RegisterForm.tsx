import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    firstname: z.string().trim().nonempty("firstname is required"),
    lastname: z.string().trim().nonempty("lastname is required"),
    email: z.string().trim().nonempty("Email is required").email("Email is invalid"),
    password: z.string().trim().nonempty("password is required"),
    confirmPassword: z.string().trim().nonempty("Confirm Password is required"),
    address: z.string().trim().nonempty("address is required"),
    province: z.string().trim().nonempty("province is required"),
    city: z.string().trim().nonempty("city is required"),
    country: z.string().trim().nonempty("country is required"),
    phoneNumber: z.string().trim().nonempty("phone is required"),
})
    .refine((data: any) => data.password === data.confirmPassword, {
        message: `Passwords do not match`,
        path: ["confirmPassword"]
    })

type FormValues = z.infer<typeof formSchema>;

const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    province: "",
    city: "",
    country: "",
    phoneNumber: "",
}


const RegisterForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    const navigate = useNavigate();

    const onRegister = async (data: FormValues) => {
        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.firstname + " " + data.lastname,
                    email: data.email,
                    password: data.password,
                    role: "user",
                    confirmPassword: data.confirmPassword,
                    address: data.province,
                    province: data.province,
                    city: data.city,
                    country: data.country,
                    phoneNumber: data.phoneNumber,
                })
            })

            const result = await response.json();

            if (response.ok) {
                throw new Error(result.message);
            }

            alert("Register successfully!");
            reset();
            navigate("/landing/login");
        } catch (err: any) {
            alert(err.message || "Something went wrong");
        }
    }

        const handleClear = () => {
            reset();
        }

    return (
        <>
            <div className="flex max-w-sm mx-auto mt-8">
                <div>
                    <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Register</h1>
                    <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <div>
                                <h1 className="font-bold">Firstname</h1>
                                <input
                                    type="text"
                                    {...register("firstname")}
                                    placeholder="Firstname is required"
                                    className="w-full px-4 py-2 rounded border-3 border-black"
                                    autoComplete="off"/>

                                {errors?.firstname && (
                                    <p className="text-red-600">{errors.firstname.message}</p>
                                )}
                            </div>

                            <div>
                                <h1 className="font-bold">Lastname</h1>
                                <input
                                    type="text"
                                    {...register("lastname")}
                                    placeholder="Lastname is required"
                                    autoComplete="off"
                                    className="w-full px-4 py-2 rounded border-3 border-black" />

                                {errors?.lastname && (
                                    <p className="text-red-600">{errors.lastname.message}</p>
                                )}
                            </div>
                        </div>

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
                                placeholder="password is required"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.password && (
                                <p className="text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">Confirm password</h1>
                            <input
                                type="password"
                                {...register("confirmPassword")}
                                placeholder="Confirm Password"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.confirmPassword && (
                                <p className="text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">Address</h1>
                            <input
                                type="text"
                                {...register("address")}
                                placeholder="Address is required"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.email && (
                                <p className="text-red-600">{errors.address?.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">Province</h1>
                            <input
                                type="text"
                                {...register("province")}
                                placeholder="Province is required"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.province && (
                                <p className="text-red-600">{errors.province.message}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-x-2">
                            <div>
                                <h1 className="font-bold">City</h1>
                                <input
                                    type="text"
                                    {...register("city")}
                                    placeholder="City is required"
                                    autoComplete="off"
                                    className="w-full px-4 py-2 rounded border-3 border-black" />

                                {errors?.city && (
                                    <p className="text-red-600">{errors.city.message}</p>
                                )}
                            </div>

                            <div>
                                <h1 className="font-bold">Country</h1>
                                <input
                                    type="text"
                                    {...register("country")}
                                    placeholder="Country is required"
                                    autoComplete="off"
                                    className="w-full px-4 py-2 rounded border-3 border-black" />

                                {errors?.country && (
                                    <p className="text-red-600">{errors.country.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h1 className="font-bold">Phone number</h1>
                            <input
                                type="text"
                                {...register("phoneNumber")}
                                placeholder="Phone number is required"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.phoneNumber && (
                                <p className="text-red-600">{errors.phoneNumber.message}</p>
                            )}
                    </div>

                     <button
                         type="submit"
                         className="bg-black text-white px-4 py-2 rounded ml-5">
                         Submit
                     </button>

                        <button
                            type="button"
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