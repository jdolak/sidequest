import React, {useState} from "react";

const AuthLogin = ({onSubmit}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://sq.jdolak.com/api/auth/login", {
                method :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),

            });

            if (!response.ok) {
                throw new Error("Failed to log in");
            }

            const data = await response.json();
            console.log("Log in successful:", data);

            if (onSubmit) {
                onSubmit(credentials);
            }
        }  catch (error) {
            console.error("Log in failed:", error);
        };
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div>Login</div>
                <label>
                    Username:
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </label>

                <button type="submit">Log in</button>
        </form>
    )
}

export default AuthLogin;