import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

declare global {
    interface Window {
        paypal: any;
    }
}

const formSchema = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    country: z.string().trim().nonempty("Country is required"),
    firstname: z.string().trim().nonempty("First name is required"),
    lastname: z.string().trim().nonempty("Last name is required"),
    address: z.string().trim().nonempty("Address is required"),
    city: z.string().trim().nonempty("City is required"),
    postalCode: z.string().trim().nonempty("Postal code is required"),
    phone: z.string().trim().nonempty("Phone is required"),
    paymentMethod: z.enum(["paypal", "googlepay"], {
        required_error: "Select a payment method",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const initialValues: FormValues = {
    email: "",
    country: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "paypal",
};

const PAYPAL_CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID"; // <---- Replace this!

const CheckoutForm = ({
                          onCheckoutSuccess,
                      }: {
    onCheckoutSuccess: () => void;
}) => {
    const [submitted, setSubmitted] = useState(false);
    const [showPaypalButton, setShowPaypalButton] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const paymentMethod = watch("paymentMethod");

    // Load PayPal SDK script dynamically when needed
    useEffect(() => {
        if (paymentMethod === "paypal" && showPaypalButton) {
            if (!window.paypal) {
                const script = document.createElement("script");
                script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
                script.async = true;
                script.onload = () => {
                    renderPaypalButton();
                };
                script.onerror = () => setPaymentError("Failed to load PayPal SDK.");
                document.body.appendChild(script);

                // Cleanup script if component unmounts or payment method changes
                return () => {
                    document.body.removeChild(script);
                    const container = document.getElementById("paypal-button-container");
                    if (container) container.innerHTML = "";
                };
            } else {
                renderPaypalButton();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentMethod, showPaypalButton]);

    // Render PayPal button into container
    const renderPaypalButton = () => {
        const container = document.getElementById("paypal-button-container");
        if (!container) {
            setPaymentError("PayPal button container not found.");
            return;
        }
        container.innerHTML = ""; // Clear previous buttons

        window.paypal
            .Buttons({
                style: {
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "paypal",
                },

                createOrder: (_data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: "10.00" } }],
                    });
                },

                onApprove: async (_data: any, actions: any) => {
                    setLoading(true);
                    setPaymentError(null);
                    try {
                        await actions.order.capture();

                        // Call backend checkout API
                        const response = await fetch("http://localhost:3001/cart/checkout", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            setPaymentError(errorData.message || "Checkout failed");
                            setLoading(false);
                            return;
                        }

                        setSubmitted(true);
                        reset();
                        onCheckoutSuccess();
                        setShowPaypalButton(false);
                        setPaymentError(null);
                        setLoading(false);

                        setTimeout(() => setSubmitted(false), 3000);
                    } catch (error) {
                        setPaymentError("Network error during checkout.");
                        setLoading(false);
                    }
                },

                onError: (err: any) => {
                    setPaymentError("PayPal payment error: " + err);
                    setLoading(false);
                },
            })
            .render("#paypal-button-container");
    };

    const onSubmit = (data: FormValues) => {
        setPaymentError(null);

        if (data.paymentMethod === "paypal") {
            setShowPaypalButton(true);
        } else if (data.paymentMethod === "googlepay") {
            alert("Google Pay integration not implemented yet.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg text-black">
            <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
                Checkout Form
            </h2>

            {submitted && (
                <p className="text-green-400 text-center mb-4">
                    Payment successful! Thank you.
                </p>
            )}
            {paymentError && (
                <p className="text-red-500 text-center mb-4">{paymentError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block font-semibold mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="w-full p-2 rounded text-black border border-gray-800"
                        autoComplete="off"
                        disabled={loading}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className="block font-semibold mb-1">
                        Country
                    </label>
                    <input
                        id="country"
                        type="text"
                        {...register("country")}
                        className="w-full p-2 rounded text-black border border-gray-800"
                        autoComplete="off"
                        disabled={loading}
                    />
                    {errors.country && (
                        <p className="text-red-500">{errors.country.message}</p>
                    )}
                </div>

                {/* First & Last Name */}
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label htmlFor="firstname" className="block font-semibold mb-1">
                            First Name
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            {...register("firstname")}
                            className="w-full p-2 rounded text-black border border-gray-800"
                            autoComplete="off"
                            disabled={loading}
                        />
                        {errors.firstname && (
                            <p className="text-red-500">{errors.firstname.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastname" className="block font-semibold mb-1">
                            Last Name
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            {...register("lastname")}
                            className="w-full p-2 rounded text-black border border-gray-800"
                            autoComplete="off"
                            disabled={loading}
                        />
                        {errors.lastname && (
                            <p className="text-red-500">{errors.lastname.message}</p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block font-semibold mb-1">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        {...register("address")}
                        className="w-full p-2 rounded text-black border border-gray-800"
                        autoComplete="off"
                        disabled={loading}
                    />
                    {errors.address && (
                        <p className="text-red-500">{errors.address.message}</p>
                    )}
                </div>

                {/* Postal & City */}
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label htmlFor="postalCode" className="block font-semibold mb-1">
                            Postal Code
                        </label>
                        <input
                            id="postalCode"
                            type="text"
                            {...register("postalCode")}
                            className="w-full p-2 rounded text-black border border-gray-800"
                            autoComplete="off"
                            disabled={loading}
                        />
                        {errors.postalCode && (
                            <p className="text-red-500">{errors.postalCode.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="city" className="block font-semibold mb-1">
                            City
                        </label>
                        <input
                            id="city"
                            type="text"
                            {...register("city")}
                            className="w-full p-2 rounded text-black border border-gray-800"
                            autoComplete="off"
                            disabled={loading}
                        />
                        {errors.city && (
                            <p className="text-red-500">{errors.city.message}</p>
                        )}
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block font-semibold mb-1">
                        Phone
                    </label>
                    <input
                        id="phone"
                        type="text"
                        {...register("phone")}
                        className="w-full p-2 rounded text-black border border-gray-800"
                        autoComplete="off"
                        disabled={loading}
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                    )}
                </div>

                {/* Payment Method */}
                <fieldset className="mt-4" disabled={loading}>
                    <legend className="font-semibold mb-2">Payment Method</legend>
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            value="paypal"
                            {...register("paymentMethod")}
                            className="mr-1"
                            defaultChecked
                        />
                        PayPal
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="googlepay"
                            {...register("paymentMethod")}
                            className="mr-1"
                        />
                        Google Pay (Coming soon)
                    </label>
                    {errors.paymentMethod && (
                        <p className="text-red-500">{errors.paymentMethod.message}</p>
                    )}
                </fieldset>

                {/* Show PayPal Button if PayPal selected and form submitted */}
                {showPaypalButton && (
                    <div className="mt-4" id="paypal-button-container"></div>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-amber-400 text-black px-6 py-2 rounded font-semibold"
                        disabled={showPaypalButton || loading}
                    >
                        {loading ? "Processing..." : "Proceed to Payment"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            reset(initialValues);
                            setShowPaypalButton(false);
                            setPaymentError(null);
                        }}
                        className="bg-gray-600 text-white px-6 py-2 rounded"
                        disabled={loading}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;