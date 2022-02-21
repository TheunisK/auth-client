import { useState, useEffect } from "react";

const emptyUser = {
    username: "",
    password: ""
}

const registerURL = "http://localhost:4000/register";

const RegisterForm = () => {
    const [userDetails, setUserDetails] = useState(emptyUser);
    const [submit, setSubmit] = useState(false);

    // const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState({});

    useEffect(async () => {

        if (submit) {
            fetch(registerURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })
            .then(res => res.json())
            .then(value => {
                console.log("POST REQUEST", value);
                setResponse(value);
            });
        }
        setSubmit(false);

    }, [submit])


    const handleSubmit = e => {
        e.preventDefault();
        console.log(userDetails);
        setSubmit(true);
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setUserDetails({
            ...userDetails, [name]: value
        });
        console.log(e.target.value);
    }

    return (
        <div className="register-form">
            <h2>Register:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type="text" 
                        name="username" 
                        value={userDetails.username} 
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={userDetails.password} 
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className="register-button" type="submit">
                    Register
                </button>
            </form>
            {response.newUser?.password} 
            {response.newUser?.username}
        </div>
    )
}

export default RegisterForm;