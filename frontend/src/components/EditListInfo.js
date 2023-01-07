import React from "react"
import Popup from "./Popup"
import trashcan from "../images/trashcan.png"

export default function EditListInfo(props) {
    const [emptyName, setEmptyName] = React.useState(false);
    const [listName, setListName] = React.useState("");
    const [showDeleteListConfirm, setShowDeleteListConfirm] = React.useState(false);
    const listId = props.listId;
    const userId = props.userId;


    React.useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `/app/ViewListInfo/${listId}`
                )
            ).json();
            setListName(data.data.name);

        };

        dataFetch();

    }, []);

    function handleChange(event) {
        const { value } = event.target;
        setListName(value);
        setEmptyName(false);
    }

    function deleteList() {
        fetch(`/app/RemoveList/${listId}`);
        setShowDeleteListConfirm(false);
        window.location.href = "";
    }

    function saveChanges() {
        if (listName == "") {
            setEmptyName(true);
            return;
        }

        fetch(`/app/EditListName/${listId}/${listName.split(' ').join('_')}`);
        props.setTrigger(false);
        window.location.href = "";
    }
    return (
        <div>
            <h1 className="editList--title">Edit List</h1>
            <form>
                <label htmlFor="listName" className="editList--label">Name</label>
                <br />
                <input type="text" name="listName" value={listName} onChange={handleChange} className="editList--textbox" />
                {emptyName && <h5 className="editList--errorMessage">Please provide a name.</h5>}           
            </form>
            <button className="editList--deleteListBtn" onClick={() => setShowDeleteListConfirm(true)}>Delete list</button>
            <img src={trashcan} alt="Trashcan" className="editList--trashcanIcon" style={{bottom: emptyName ? '255px' : '271px'}}/>
            <br />
            <button className="editList--saveChangesBtn" onClick={saveChanges}>Save changes</button>
            <Popup trigger={showDeleteListConfirm} setTrigger={setShowDeleteListConfirm} class="smallPopup">
                <h3>Are you sure you would like to delete this list?</h3>
                <button onClick={deleteList} className="editList--deleteListYes">Yes</button>
                <button onClick={() => setShowDeleteListConfirm(false)} className="editList--deleteListNo">No</button>
            </Popup>
        </div>
    )
}
