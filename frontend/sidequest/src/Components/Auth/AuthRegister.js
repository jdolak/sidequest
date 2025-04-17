import React, {useState} from "react";

const AuthRegister = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://sq.jdolak.com/api/auth/register", {
                method :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const data = await response.json();
            console.log("Registration successful:", data);

            if (onSubmit) {
                onSubmit(formData);
            }
        }  catch (error) {
            console.error("Registration failed:", error);
        };
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div>Register</div>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>

            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>

            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>

            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>

            <button type="submit">Sign up</button>
        </form>
    )
}

export default AuthRegister;
