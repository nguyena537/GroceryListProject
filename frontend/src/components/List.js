import React from "react"

export default function List(props) {
    const list = props.list;

    function mouseOverListTitle(event) {
        event.target.style.background = "#e8eaed";
    }

    function mouseLeaveListTitle(event) {
        event.target.style.background = "white";
    }

    return (
        <div className="viewLists--listAndEditBtns">
            <form action={`/list/${list.id}`}>
                <input onMouseOver={mouseOverListTitle} onMouseLeave={mouseLeaveListTitle} type="submit" value={`${list.name}`} className="viewLists--listTitle" />
            </form>
            <div className="viewLists--listNumItems">{`${list.numItems}`}</div>
            <button onMouseOver={mouseOverListTitle} onMouseLeave={mouseLeaveListTitle} onClick={() => props.editListClick(list.id)} className="viewLists--editListBtn">Edit list</button>
        </div>
    )
}
