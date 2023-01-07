import React from "react"
import { useParams } from "react-router-dom"
import Popup from "./Popup"
import CreateList from "./CreateList"
import EditListInfo from "./EditListInfo"
import LogoutButton from "./LogoutButton"
import Cookies from "js-cookie"
import List from "./List"

export default function ViewLists() {
    const [lists, setLists] = React.useState([]);
    const [showCreate, setShowCreate] = React.useState(false);
    const [showEditList, setShowEditList] = React.useState(false);
    const [currListId, setCurrListId] = React.useState(-1);
    const [sorting, setSorting] = React.useState({
        sortTitle: true,
        sortNumItems: false,
        titleDescending: false,
        titleAscending: true,
        numItemsDescending: false,
        numItemsAscending: false
    })

    React.useEffect(() => {
        if (Cookies.get("userId") == null) {
            window.location.href = "/login";
            return;
        }

        // fetch data
        const dataFetch = async () => {
            const listData = await (
                await fetch(
                    `/app/ViewAllLists`
                )
            ).json();
            setLists(listData.data);
        };

        dataFetch();

    }, []);

    function editListClick(listId) {
        setCurrListId(listId);
        setShowEditList(true);
    }
    const displayLists = lists.map(list => {
        if (sorting.sortTitle) {
            if (sorting.titleDescending) {
                lists.sort(function (a, b) {
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }

                    return 0;
                });
            } else {
                lists.sort(function (a, b) {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA > nameB) {
                        return 1;
                    }
                    if (nameA < nameB) {
                        return -1;
                    }

                    return 0;
                });
            }
        } else {
            if (sorting.numItemsDescending) {
                lists.sort((a, b) => (a.numItems > b.numItems) ? 1 : (a.numItems < b.numItems) ? -1 : 0);
            } else {
                lists.sort((a, b) => (a.numItems > b.numItems) ? -1 : (a.numItems < b.numItems) ? 1 : 0);
            }
        }
        return (
            <List
                editListClick={editListClick}
                list={list}
            />
        )
    })

    function sortLists(event) {
        const { name } = event.target;
        if (name == "name") {
            if (!sorting.sortTitle) {
                setSorting(prevSorting => ({
                    ...prevSorting,
                    sortTitle: true,
                    sortNumItems: false
                }))

                
            }
            else {
                setSorting(prevSorting => ({
                    ...prevSorting,
                    titleDescending: !prevSorting.titleDescending,
                    titleAscending: !prevSorting.titleAscending
                }))
            }

            
        }
        else if (name == "numItems") {
            if (!sorting.sortNumItems) {
                setSorting(prevSorting => ({
                    ...prevSorting,
                    sortTitle: false,
                    sortNumItems: true
                }))
            }
            else {
                setSorting(prevSorting => ({
                    ...prevSorting,
                    numItemsDescending: !prevSorting.numItemsDescending,
                    numItemsAscending: !prevSorting.numItemsAscending
                }))
            }
        }
    }

    return (
        <div>
            <LogoutButton />
            <div className="viewLists--columnNames">
                {sorting.sortTitle ? <button onClick={sortLists} name="name" className="viewLists--sortTitleBtn">Title {sorting.titleDescending ? "down" : "up"}</button> : <button onClick={sortLists} name="name" className="viewLists--sortTitleBtn">Title</button>}
                {sorting.sortNumItems ? <button onClick={sortLists} name="numItems" className="viewLists--sortNumItemsBtn">Number of items {sorting.numItemsDescending ? "down" : "up"}</button> : <button onClick={sortLists} name="numItems" className="viewLists--sortNumItemsBtn">Number of items</button>}
                <button className="viewLists--editLabel">Edit</button>
            </div>
            <div className="viewLists--listContainer">
                {displayLists}
            </div>
            <div>
                <button onClick={() => setShowCreate(true)} className="viewLists--createListBtn">+ Create List</button>
            </div>
            <Popup trigger={showCreate} setTrigger={setShowCreate} class="popup-inner">
                <CreateList
                    setTrigger={setShowCreate}
                />
            </Popup>
            <Popup trigger={showEditList} setTrigger={setShowEditList} class="popup-inner">
                <EditListInfo
                    setTrigger={setShowEditList}
                    listId={currListId}
                />
            </Popup>
        </div>
    )
}
