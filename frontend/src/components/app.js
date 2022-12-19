import React from "react";

export default function App() {
    const [categories, setCategories] = React.useState([]);
    const [listItems, setListItems] = React.useState([]);

    React.useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "/app/ViewItemsInList/1"
                )
            ).json();

            // set state when the data received
            setListItems(data.data);
        };

        dataFetch();
    }, []);



    return (
        <div>
            {listItems.map((item) => {
                return <h5 key={item.id}>{item.name}</h5>
            })}
        </div>
    )
}