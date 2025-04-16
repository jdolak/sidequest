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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(credentials);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div>Login</div>
                <label>
                    Username:
                    <input type="text" name="username" value={credentials.username} onChange={handlechange} required />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handlechange} required />
                </label>

                <button type="submit">Log in</button>
        </form>
    )
}