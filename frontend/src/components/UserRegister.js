import React from "react"

export default function UserRegister() {
    const [userInfo, setUserInfo] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    })
    const [userExists, setUserExists] = React.useState(false);
    const [emptyField, setEmptyField] = React.useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setEmptyField(false);
        if (name == "username") {
            setUserExists(false);
        }

        setUserInfo(prevUserInfo => {
            return {
                ...prevUserInfo,
                [name]: value
            }
        })
    }

    function registerUser() {
        if (userInfo.firstName == "" || userInfo.lastName == "" || userInfo.email == "" || userInfo.username == "" || userInfo.password == "") {
            setEmptyField(true);
            return;
        }


        const loginFetch = async () => {
            const data = await (
                await fetch("/app/UserRegister", {
                    method: 'POST',
                    body: JSON.stringify(userInfo)
                })
            ).json();

            console.log(data);
            if (data.message == "User already exists.") {
                setUserExists(true);
            } else {
                console.log("Success!")
                window.location.href = "";
            }
        };

        loginFetch();
    }

    return (
        <div>
            <h1 className="userRegister--title">Register</h1>
            <form>
                <label htmlFor="firstName" className="userRegister--label">First Name</label>
                <br />
                <input type="text" name="firstName" onChange={handleChange} className="userRegister--textbox" />
                <br />
                <label htmlFor="lastName" className="userRegister--label">Last Name</label>
                <br />
                <input type="text" name="lastName" onChange={handleChange} className="userRegister--textbox" />
                <br />
                <label htmlFor="email" className="userRegister--label">Email</label>
                <br />
                <input type="text" name="email" onChange={handleChange} className="userRegister--textbox" />
                <br />
                <label htmlFor="username" className="userRegister--label">Username</label>
                <br />
                <input type="text" name="username" onChange={handleChange} className="userRegister--textbox" />
                {userExists && <h5 className="userRegister--errorMessage">Username is taken.</h5>}
                <br />
                <label htmlFor="password" className="userRegister--label">Password</label>
                <br />
                <input type="text" name="password" onChange={handleChange} className="userRegister--textbox" />
                <br />
                {emptyField && <h5 className="userRegister--errorMessage">Please provide a value for every field.</h5>}
                <button type="button" onClick={registerUser} className="userRegister--registerBtn">Sign up</button>
            </form>
        </div>
    )
}
