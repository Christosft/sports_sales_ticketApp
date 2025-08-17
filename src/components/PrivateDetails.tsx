import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { z } from "zod";

const formSchema = z.object({
    firstname: z.string().trim().nonempty("Firstname is required"),
    lastname: z.string().trim().nonempty("Lastname is required"),
    email: z.string().trim().nonempty("Email is required").email("Email is invalid"),
    password: z.string().trim().optional(),
    confirmPassword: z.string().trim().optional(),
    address: z.string().trim().nonempty("Address is required"),
    province: z.string().trim().nonempty("Province is required"),
    city: z.string().trim().nonempty("City is required"),
    country: z.string().trim().nonempty("Country is required"),
    phoneNumber: z.string().trim().nonempty("Phone is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type FormValues = z.infer<typeof formSchema>;

const initialValues: FormValues = {
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
};

const PrivateDetails = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null); // store user's id

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");

                const res = await fetch("http://localhost:3001/auth/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch user data");

                const data = await res.json();
                console.log("User data from backend:", data);

                setUserId(data.id);

                // Αν backend δίνει username (πχ "John Doe") και όχι firstname/lastname
                const [firstname = '', lastname = ''] = data.username ? data.username.split(' ') : ['', ''];

                reset({
                    firstname,
                    lastname,
                    email: data.email || "",
                    password: "",
                    confirmPassword: "",
                    address: data.address || "",
                    province: data.province || "",
                    city: data.city || "",
                    country: data.country || "",
                    phoneNumber: data.phone || "",
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUserDetails();
    }, [reset]);

    const onDetails = async (data: FormValues) => {
        if (!userId) {
            alert("User not loaded yet.");
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3001/auth/user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: data.firstname + " " + data.lastname,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    address: data.address,
                    province: data.province,
                    city: data.city,
                    country: data.country,
                    phone: data.phoneNumber,
                }),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Update failed");

            alert("User updated successfully!");
        } catch (err: any) {
            alert(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg text-black">
            <div>
                <h1 className="text-4xl font-bold text-amber-200 text-center mb-4">Update Profile</h1>
                <form onSubmit={handleSubmit(onDetails)} className="space-y-4">
                    <div className="flex gap-2">
                    <div className="flex-1">
                        <h1 className="font-bold">Firstname</h1>
                        <input
                            type="text"
                            {...register("firstname")}
                            placeholder="Firstname is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.firstname && <p className="text-red-600">{errors.firstname.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Lastname</h1>
                        <input
                            type="text"
                            {...register("lastname")}
                            placeholder="Lastname is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.lastname && <p className="text-red-600">{errors.lastname.message}</p>}
                    </div>
                    </div>
                    <div>
                        <h1 className="font-bold">Email</h1>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Email is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Password</h1>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.password && <p className="text-red-600">{errors.password.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Confirm Password</h1>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="Confirm Password is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Address</h1>
                        <input
                            type="text"
                            {...register("address")}
                            placeholder="Address is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.address && <p className="text-red-600">{errors.address.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Province</h1>
                        <input
                            type="text"
                            {...register("province")}
                            placeholder="Province is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.province && <p className="text-red-600">{errors.province.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">City</h1>
                        <input
                            type="text"
                            {...register("city")}
                            placeholder="City is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.city && <p className="text-red-600">{errors.city.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Country</h1>
                        <input
                            type="text"
                            {...register("country")}
                            placeholder="Country is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.country && <p className="text-red-600">{errors.country.message}</p>}
                    </div>

                    <div>
                        <h1 className="font-bold">Phone Number</h1>
                        <input
                            type="text"
                            {...register("phoneNumber")}
                            placeholder="Phone number is required"
                            className="w-full px-4 py-2 rounded border-3 border-black"
                        />
                        {errors?.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded ml-5"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PrivateDetails;