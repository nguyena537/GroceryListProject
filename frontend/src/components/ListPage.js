import React from "react";
import { useParams } from "react-router-dom";
import Popup from "./Popup"
import EditItem from "./EditItem"
import SearchItems from "./SearchItems"
import LogoutButton from "./LogoutButton"
import Cookies from "js-cookie";

export default function ListPage(props) {
    const [listItems, setListItems] = React.useState([]);
    const [currItemId, setCurrItemId] = React.useState(-1);
    const [showEdit, setShowEdit] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
    const [showCrossedOff, setShowCrossedOff] = React.useState(false);
    const { listId } = useParams();
    let currCategory = "0";

    React.useEffect(() => {
        if (Cookies.get("userId") == null) {
            window.location.href = "/login"
            return;
        }
        // fetch data
        const dataFetch = async () => {
            const listData = await (
                await fetch(
                    `/app/ViewItemsInList/${listId}`
                )
            ).json();
            if (listData.success == true) {
                setListItems(listData.data)
            } else {
                if (listData.message == "This list does not belong to the user.") {
                    window.location.href = "/error/404"
                    return;
                } else if (listData.message == "List does not exist") {
                    window.location.href = "/error/404"
                    return;
                }
            }


            const listInfo = await (
                await fetch(
                    `/app/ViewListInfo/${listId}`
                )
            ).json();
            setShowCrossedOff(listInfo.data.showCrossedOff);
            
        };

        dataFetch();

    }, []);

    function crossOffItem(itemId) {
        fetch(`/app/ToggleCrossedOff/${listId}/${itemId}`);

        const newListItems = listItems.map(item => {
            if (item.itemId == itemId) {
                let newItem = item;
                newItem.crossedOff = !item.crossedOff;
                return newItem;
            }

            return item;
        })

        setListItems(newListItems);
    }

    function showEditItemPopup(itemId) {
        setCurrItemId(itemId);
        setShowEdit(true);
    }

    function toggleShowCrossedOff() {
        setShowCrossedOff(!showCrossedOff);
        fetch(`/app/ToggleShowCrossedOff/${listId}`);
    }

    let displayListItems = listItems.filter(item => !(item.crossedOff && !showCrossedOff)).map(item => {
        if (item.category === currCategory) {
            return (
                <div className="listItem--itemAndEditButtons">
                    {item.crossedOff ? (showCrossedOff && <button className="listItem--button" key={item.itemId} onClick={() => crossOffItem(item.itemId)}><s className="listItem--crossedOffMark">{item.name}</s></button>)
                        : <button className="listItem--button" key={item.itemId} onClick={() => crossOffItem(item.itemId)}>{item.name}: {item.quantity}</button>}
                    <button value="Edit Item" className="listItem--editItemButton" onClick={() => showEditItemPopup(item.itemId)}>Edit item</button>
                </div>
            )
        }
        else {
            currCategory = item.category;
            return (
                <div>
                    <h5 className="listItem--category">{currCategory}</h5>
                    <div className="listItem--itemAndEditButtons">
                        {item.crossedOff ? (showCrossedOff && <button className="listItem--button" key={item.itemId} onClick={() => crossOffItem(item.itemId)}><s className="listItem--crossedOffMark">{item.name}</s></button>)
                            : <button className="listItem--button" key={item.itemId} onClick={() => crossOffItem(item.itemId)}>{item.name}: {item.quantity}</button>}
                        <button value="Edit Item" className="listItem--editItemButton" onClick={() => showEditItemPopup(item.itemId)}>Edit item</button>
                    </div>
                </div>
            )
        }

    });

    return (
        <div>
            <LogoutButton />
            <div className="listItem--topButtons">
                <form action={`/`}>
                    <input type="submit" value="Back to lists" />
                </form>
                <button className="listItem--addItemButton" onClick={() => setShowSearch(true)}>+ Add Item</button>
                <Popup trigger={showSearch} setTrigger={setShowSearch} class="popup-inner">
                    <SearchItems
                        listId={listId}
                        setTrigger={setShowSearch}
                    />
                </Popup>
                {showCrossedOff ? <button onClick={toggleShowCrossedOff}>Hide Crossed Off</button> : <button onClick={toggleShowCrossedOff}>Show Crossed Off</button>}
            </div>
            
            <h1 className="listItem--title">List Items</h1>
            {listItems.length == 0 && <h3 className="listItem--noItemsMsg">You have no list items.</h3>}
            <div className="listItem--items">
                {displayListItems}
            </div>
            <Popup trigger={showEdit} setTrigger={setShowEdit} class="popup-inner">
                <EditItem
                    listId={listId}
                    itemId={currItemId}
                    setTrigger={setShowEdit}
                />
            </Popup>
        </div>
        
    )
}
