import { useState, useEffect } from "react";

const loginURL = "http://localhost:4000/login";

const emptyUser = {
    username: "",
    password: ""
}



const LoginForm = () => {
    const [loginDetails, setLoginDetails] = useState(emptyUser);
    const [login, setLogin] = useState(false);

    const [response, setResponse] = useState({});

    useEffect(async () => {
        if (login) {
            fetch(loginURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginDetails)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.newToken);
                setResponse(data);
                localStorage.setItem("jwt", data.newToken)
                console.log(localStorage)
            })
        }
        setLogin(false);
    }, [login])

    const handleSubmit = e => {
        e.preventDefault();
        setLogin(true);
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setLoginDetails({
            ...loginDetails, [name]: value
        })
        console.log("CHANGE", name, value)
    }



    return (
        <div className="login-form">
            <h2>Login:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type="text"
                        name="username"
                        value={loginDetails.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password"
                        name="password"
                        value={loginDetails.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className="login-button" type="submit">
                    Login
                </button>
            </form>
            {response.newToken}
        </div>
    )
}

export default LoginForm;