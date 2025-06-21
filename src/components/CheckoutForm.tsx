import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email().nonempty("Email is required"),
    country: z.string().trim().nonempty("Country is required"),
    firstname: z.string().trim().nonempty("First Name is required"),
    lastname: z.string().trim().nonempty("Last Name is required"),
    address: z.string().trim().nonempty("Address is required"),
    city: z.string().trim().nonempty("City is required"),
    postalCode: z.string().trim().nonempty("Postal code is required"),
    phone: z.string().trim().nonempty("Phone is required"),
    creditCard: z.string().trim().nonempty("Credit card is required"),
    cardNumber: z.string().trim().nonempty("Card number is required"),
    expirationDate: z.string().trim().nonempty("Expiration date is required"),
    securityCode: z.string().trim().nonempty("Security Code is required"),
    nameOnTheCard: z.string().trim().nonempty("Name is required"),

})

type FormValues = z.infer<typeof formSchema>;

const initialValues = {
    email: "",
    country: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    creditCard: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnTheCard: "",
}

const CheckoutForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const onCheckout = (data: FormValues) => {
        console.log(data);
        reset();
    }

    const onClear = () => {
        reset();
    }

        return (
            <>
                <div className="flex max-w-sm mx-auto mt-8">
                    <div>
                        <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Checkout Form</h1>
                        <form onSubmit={handleSubmit(onCheckout)} className="space-y-4">

                            <div>
                                <h1 className="font-bold">Email</h1>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="Email is required"
                                    autoComplete="off"
                                    className="w-full px-4 py-2 rounded border-3 border-black"/>

                                {errors?.email && (
                                    <p className="text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <h1 className="font-bold">Country</h1>
                                <input
                                    type="text"
                                    {...register("country")}
                                    placeholder="Country is required"
                                    autoComplete="off"
                                    className="w-full px-4 py-2 rounded border-3 border-black"/>

                                {errors?.country && (
                                    <p className="text-red-600">{errors.country.message}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div>
                                    <h1 className="font-bold">Firstname</h1>
                                    <input
                                        type="text"
                                        {...register("firstname")}
                                        placeholder="firstname is required"
                                        className="w-full px-4 py-2 rounded border-black border-3"
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
                                        placeholder="lastname is required"
                                        className="w-full px-4 py-2 rounded border-black border-3"
                                        autoComplete="off"/>

                                    {errors?.lastname && (
                                        <p className="text-red-600">{errors.lastname.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h1 className="font-bold">Address</h1>
                                <input
                                    type="text"
                                    {...register("address")}
                                    placeholder="address is required"
                                    className="w-full px-4 py-2 rounded border-black border-3"
                                    autoComplete="off"/>

                                {errors?.address && (
                                    <p className="text-red-600">{errors.address.message}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-x-2">
                                <div>
                                    <h1 className="font-bold">Postal Code</h1>
                                    <input
                                        type="text"
                                        {...register("postalCode")}
                                        placeholder="postal code is required"
                                        className="w-full px-4 py-2 rounded border-black border-3"
                                        autoComplete="off"/>

                                    {errors?.postalCode && (
                                        <p className="text-red-600">{errors.postalCode.message}</p>
                                    )}
                                </div>

                                <div>
                                    <h1 className="font-bold">City</h1>
                                    <input
                                        type="text"
                                        {...register("city")}
                                        placeholder="city is required"
                                        className="w-full px-4 py-2 rounded border-black border-3"
                                        autoComplete="off"/>

                                    {errors?.city && (
                                        <p className="text-red-600">{errors.city.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h1 className="font-bold">Phone</h1>
                                <input
                                    type="text"
                                    {...register("phone")}
                                    placeholder="phone is required"
                                    className="w-full px-4 py-2 rounded border-black border-3"
                                    autoComplete="off"/>

                                {errors?.phone && (
                                    <p className="text-red-600">{errors.phone.message}</p>
                                )}
                            </div>

                            <hr className="my-8 border-t-4 border-dashed border-amber-300" />

                            <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Payment Details</h1>

                            <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white/20">
                                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex justify-between items-center">
                                    <h1 className="font-bold">Credit Card</h1>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="credit-card"
                                            {...register("creditCard")}
                                            className="accent-black"
                                        />
                                        <span className="font-medium text-black">Credit card</span>
                                    </label>

                                    {errors?.creditCard && (
                                        <p className="text-red-600">{errors.creditCard.message}</p>
                                    )}
                                </div>
                                    <div>
                                        <h1 className="font-bold">Card number</h1>
                                        <input
                                            type="text"
                                            {...register("cardNumber")}
                                            placeholder="card number is required"
                                            className="w-full px-4 py-2 rounded border-black border-3"
                                            autoComplete="off"/>

                                        {errors?.cardNumber && (
                                            <p className="text-red-600">{errors.cardNumber.message}</p>
                                        )}
                                    </div>

                                <div className="flex items-center gap-x-2">
                                    <div>
                                        <h1 className="font-bold">Expiration Date</h1>
                                        <input
                                            type="text"
                                            {...register("expirationDate")}
                                            placeholder="expiration date is required"
                                            className="w-full px-4 py-2 rounded border-black border-3"
                                            autoComplete="off"/>

                                        {errors?.expirationDate && (
                                            <p className="text-red-600">{errors.expirationDate.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <h1 className="font-bold">Security Code</h1>
                                        <input
                                            type="password"
                                            {...register("securityCode")}
                                            placeholder="security code is required"
                                            className="w-full px-4 py-2 rounded border-black border-3"
                                            autoComplete="off"/>

                                        {errors?.securityCode && (
                                            <p className="text-red-600">{errors.securityCode.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h1 className="font-bold">Name on card</h1>
                                    <input
                                        type="text"
                                        {...register("nameOnTheCard")}
                                        placeholder="name on card is required"
                                        className="w-full px-4 py-2 rounded border-black border-3"
                                        autoComplete="off"/>

                                    {errors?.nameOnTheCard && (
                                        <p className="text-red-600">{errors.nameOnTheCard.message}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded ml-5">
                                Checkout
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
export default CheckoutForm;