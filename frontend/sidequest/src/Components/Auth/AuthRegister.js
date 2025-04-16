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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div>Register</div>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handlechange} required />
            </label>

            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handlechange} required />
            </label>

            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handlechange} required />
            </label>

            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handlechange} required />
            </label>

            <button type="submit">Sign up</button>
        </form>
    )
}

export default AuthRegister;
