import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router";
import { useForm } from "react-hook-form";

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

    const onRegister = (data: FormValues) => {
        console.log(data);
        reset();

            navigate("/landing/login")
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
                        <div>
                            <h1 className="font-bold">FIRSTNAME</h1>
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
                            <h1 className="font-bold">LASTNAME</h1>
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
                            <h1 className="font-bold">ADDRESS</h1>
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
                            <h1 className="font-bold">PROVINCE</h1>
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

                        <div>
                            <h1 className="font-bold">CITY</h1>
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
                                placeholder="Email is required"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                            {errors?.country && (
                                <p className="text-red-600">{errors.country.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="font-bold">PHONENUMBER</h1>
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