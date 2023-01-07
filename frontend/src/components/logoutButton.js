import React from "react"

export default function LogoutButton() {

    function logoutClicked() {
        fetch("/app/UserLogout");
        window.location.href = "/login"
    }

    return (
        <button onClick={logoutClicked} className="logoutBtn">Log out</button>
    )
}
