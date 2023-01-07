import React from "react";
import trashcan from "../images/trashcan.png"

export default function EditItem(props) {
    const [currItemInfo, setCurrItemInfo] = React.useState({
        itemId: 0,
        name: "0",
        unit: "0",
        photoUrl: "0",
        category: "0",
        quantity: 0,
        crossedOff: false,
        note: "0"
    });

    const [categories, setCategories] = React.useState([]);
    const listId = props.listId;
    const itemId = props.itemId;

    React.useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `/app/ViewItemInfoInList/${listId}/${itemId}`
                )
            ).json();
            setCurrItemInfo(data.data);
            
        };

        dataFetch();

    }, []);

    React.useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `/app/ViewAllCategories`
                )
            ).json();
            setCategories(data.data);

        };

        dataFetch();

    }, []);

    //function viewAllCategories() {
    //    fetch(`/app/ViewAllCategories/1`)
    //        .then(res => res.json())
    //        .then(data => setCategories(data.data))
    //}

    let allCategories = categories.map(category => {
        return (
            <option value={category.name} key={category.id}>{category.name}</option>
        )
    })

    let numbers = [];
    for (let i = 1; i <= 20; i++) {
        numbers.push(i);
    }

    let quantityNumbers = numbers.map(number => {
        return (
            <option value={number}>{number}</option>
        )
    })
    function handleChange(event) {
        const { name, value } = event.target;

        setCurrItemInfo({
            ...currItemInfo,
            [name]: value
        })

    }

    function removeItem() {
        fetch(`/app/RemoveItemFromList/${listId}/${itemId}`);
        props.setTrigger(false);
        window.location.href = "";
    }

    function saveChanges() {
        currItemInfo.category != null ? fetch(`/app/EditItemInList/${listId}/${itemId}/c/${currItemInfo.category.split(' ').join('_')}`)
            : fetch(`/app/EditItemInList/${listId}/${itemId}/c/${currItemInfo.category}`);
        fetch(`/app/EditItemInList/${listId}/${itemId}/q/${currItemInfo.quantity}`);
        currItemInfo.note != null && currItemInfo.note != "" && currItemInfo.note != "null" ? fetch(`/app/EditItemInList/${listId}/${itemId}/n/${currItemInfo.note.split(' ').join('_')}`)
            : fetch(`/app/EditItemInList/${listId}/${itemId}/n/_`);
        props.setTrigger(false);
        window.location.href = "";
    }



    return (
        <div>
            <h2>Name: {currItemInfo.name}</h2>
            <h3>Unit: {currItemInfo.unit}</h3>
            <div className="editItem--form">
                <form>
                    <label htmlFor="changeCategory" className="editItem--label">Category</label>
                    <select name="category" value={currItemInfo.category} onChange={handleChange} className="editItem--dropdown">
                        {allCategories}
                    </select>

                    <br />

                    <label htmlFor="changeQuantity" className="editItem--label">Quantity</label>
                    <select name="quantity" value={currItemInfo.quantity} onChange={handleChange} className="editItem--dropdown">
                        {quantityNumbers}
                    </select>

                    <br />

                    <label htmlFor="changeNote" className="editItem--label">Note</label>
                    {currItemInfo.note != null ? <input type="text" name="note" value={currItemInfo.note} onChange={handleChange} className="editItem--textbox" /> : <input type="text" name="note" value="" onChange={handleChange} className="editItem--textbox"/>}
                </form>
                <button className="editItem--removeItemBtn" onClick={removeItem}>Remove item</button>
                <img src={trashcan} alt="Trashcan" className="editList--trashcanIcon" />
                <br />
                <button className="editItem--saveChangesBtn" onClick={saveChanges}>Save changes</button>
            </div>
        </div>
    )
}
