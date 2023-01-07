import React from "react";
import { useParams } from "react-router-dom"

export default function SearchItems(props) {
    const [searchItems, setSearchItems] = React.useState([]);
    const [phrase, setPhrase] = React.useState("");
    const listId = props.listId;

    React.useEffect(() => {
        // fetch data
        if (phrase != "") {
            const dataFetch = async () => {
                const data = await (
                    await fetch(
                        `/app/ViewItemsContainingPhrase/${phrase}/${listId}`
                    )
                ).json();
                setSearchItems(data.data);
                
            };
            

            dataFetch();
        } else {
            setSearchItems([]);
        }
        
    }, [phrase]);

    function handleChangePhrase(event) {
        const { value } = event.target;
        setPhrase(value);
    }

    function addItemToList(itemId) {
        console.log(itemId)
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `/app/AddExistingItemToList/${listId}/${itemId}`
                )
            ).json();
            console.log(data)
        };

        dataFetch();
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search for an item"
                className="form--input"
                name="searchForItem"
                className="searchItem--input"
                value={phrase}
                onChange={handleChangePhrase}
            />

            <div className="searchItem--items">
                {searchItems.map((item) => {
                    return (
                        <form action={`/list/${listId}`}>
                            <input type="submit" className="searchItem--button" key={item.id} onClick={() => addItemToList(item.id)} value={item.name} />
                        </form>
                    ) 
                })}
            </div>
        </div>
    )
}