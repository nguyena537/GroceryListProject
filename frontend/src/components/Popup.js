import React from "react"

export default function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className={props.class}>
                <button className="popup--closeBtn" onClick={() => props.setTrigger(false)}>X</button>
                {props.children}
            </div>
        </div>
    ): "";
}
