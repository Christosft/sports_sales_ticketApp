import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

const subscribeSchema = z.object({
    email: z.string().trim().nonempty("email is required").email("Email is invalid"),
})

type SubscribeValues = z.infer<typeof subscribeSchema>;

const initialValues = {
    email: "",
}


const NewsletterForm = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<SubscribeValues>({
        resolver: zodResolver(subscribeSchema),
        defaultValues: initialValues,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        },1000);
        return () => clearTimeout(timer);
    }, []);

    const onSubmit = (data: SubscribeValues) => {
        console.log("Subscribed:", data);
        alert("Thank you for subscribing to our account.");
        reset();
        setOpen(false);

        navigate("/home")
    }

    if (!open) return null;

    return(
        <>
            <div className="flex max-w-sm mx-auto mt-8">
                <div className="bg-[url('/newsletterbg.jpg')] bg-cover bg-center justify-center items-center p-8">
                    <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Subscribe to our newsletter</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    <div>
                        <h1 className="font-bold">Please enter your email</h1>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Email is required for subscription"
                                autoComplete="off"
                                className="w-full px-4 py-2 rounded border-3 border-black" />

                                {errors?.email && (
                                    <p className="text-red-600">{errors.email.message}</p>
                                )}
                    </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>

                        <button
                            type="button"
                            onClick={() => { setOpen(false), navigate("/home")}}
                            className="text-black hover:text-gray-700"
                        >
                            Close
                        </button>
                        <p className="text-blue-700">By subscribing you are accepting our Privacy Policy</p>
                    </form>
                </div>
            </div>
        </>
    )
}
export default NewsletterForm;