import React from "react"

export default function CreateList(props) {
    const [listName, setListName] = React.useState("");
    const [emptyName, setEmptyName] = React.useState(false);

    function handleChange(event) {
        const { value } = event.target;
        setListName(value);
        setEmptyName(false);
    }

    function createList() {
        if (listName == "") {
            setEmptyName(true);
            return;
        }

        fetch(`/app/CreateList/${listName}`);
        props.setTrigger(false);
        window.location.href = "";
    }

    return (
        <div>
            <h1 className="createList--title">Create a List</h1>
            <form>
                <label htmlFor="listName" className="createList--label">Name</label>
                <br />
                <input type="text" name="listName" value={listName} onChange={handleChange} className="createList--textbox" />
                {emptyName && <h5 className="createList--errorMessage">Please provide a name.</h5>}
            </form>
            <button onClick={createList} className="createList--createListBtn">+ Create List</button>
        </div>
    )
}
