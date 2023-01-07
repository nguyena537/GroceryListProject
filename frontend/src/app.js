import React from "react";
import SearchItems from "./components/SearchItems"
import Home from "./components/Home"
import ListPage from "./components/ListPage"
import EditItem from "./components/EditItem"
import ViewLists from "./components/ViewLists"
import LoginPage from "./components/LoginPage"
import ErrorPage from "./components/ErrorPage"

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<ViewLists />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/list/:listId" element={<ListPage />} />
                    <Route path="/error/:errorCode" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>
    ) 
}