import React from "react"
import Popup from "./Popup"
import UserRegister from "./UserRegister"
import ShowPassword from "../images/ShowPassword.jpg"
import HidePassword from "../images/HidePassword.jpg"

export default function LoginPage() {
    const [login, setLogin] = React.useState({
        username: "",
        password: ""
    });
    const [showRegister, setShowRegister] = React.useState(false);
    const [emptyField, setEmptyField] = React.useState({
        username: false,
        password: false
    })
    const [showPassword, setShowPassword] = React.useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setLogin(prevLogin => {
            return {
                ...prevLogin,
                [name]: value
            }
        })

        if (name == "username") {
            setUserNotExists(false);
            setEmptyField(prevEmptyField => {
                return {
                    ...prevEmptyField,
                    username: false
                }
            })
        } else {
            setWrongPassword(false);
            setEmptyField(prevEmptyField => {
                return {
                    ...prevEmptyField,
                    password: false
                }
            })
        }
    }
    const [userNotExists, setUserNotExists] = React.useState(false);
    const [wrongPassword, setWrongPassword] = React.useState(false);

    function loginClicked(event) {
        if (login.username == "" || login.password == "") {
            if (login.username == "") {
                setEmptyField(prevEmptyField => {
                    return {
                        ...prevEmptyField,
                        username: true
                    }
                })
            }

            if (login.password == "") {
                setEmptyField(prevEmptyField => {
                    return {
                        ...prevEmptyField,
                        password: true
                    }
                })
            }

            return;
        }

        const loginFetch = async () => {
            const data = await (
                await fetch("/app/UserLogin", {
                    method: 'POST',
                    body: JSON.stringify(login)
                })
            ).json();

            if (data.message == "User not found.") {
                setUserNotExists(true);
            } else if (data.message == "Incorrect password.") {
                setWrongPassword(true);
            } else {
                console.log("Success!")
                window.location.href = "/";
            }
        };

        loginFetch();
            
    }

    return (
        <div className="loginPage">
            <h1 className="loginPage--title">Welcome to the Grocery List App!</h1>

            <div className="loginPage--formDiv">
                <form className="loginPage--loginForm">
                    <label htmlFor="username" className="loginPage--label">Username</label>
                    <br />
                    <input type="text" name="username" onChange={handleChange} value={login.username} className="loginPage--textbox" />
                    {userNotExists && <h5 className="loginPage--errorMessage">Username does not exist</h5>}
                    {emptyField.username && <h5 className="loginPage--errorMessage">Please enter a username</h5>}
                    <br />
                    <label htmlFor="password" className="loginPage--label">Password</label>
                    <br />
                    <div className="loginPage--passwordDiv">
                        {showPassword ? <input type="text" name="password" onChange={handleChange} value={login.password} className="loginPage--textbox" /> : <input type="password" name="password" onChange={handleChange} value={login.password} className="loginPage--textbox" />}
                        {showPassword ? <img src={HidePassword} alt="Hide password" onClick={() => setShowPassword(false)} className="loginPage--hidePasswordIcon" /> : <img src={ShowPassword} alt="Show password" onClick={() => setShowPassword(true)} className="loginPage--showPasswordIcon" />}
                    </div>
                    {wrongPassword && <h5 className="loginPage--errorMessage">Incorrect password</h5>}
                    {emptyField.password && <h5 className="loginPage--errorMessage">Please enter a password</h5>}
                    <br />
                    <button type="button" className="loginPage--loginBtn" onClick={loginClicked}>Login</button>
                    <br />
                    <button type="button" className="loginPage--registerBtn" onClick={() => setShowRegister(true)}>Register</button>   
                </form>
            </div>
            <Popup trigger={showRegister} setTrigger={setShowRegister} class="popup-inner">
                <UserRegister
                    setTrigger={setShowRegister}
                />
            </Popup>
        </div>
    )
}
