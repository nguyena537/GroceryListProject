import React from "react"
import { useParams } from "react-router-dom"

export default function ErrorPage() {
    const { errorCode } = useParams();
    return (
        <div>
            <h1>{errorCode} error</h1>
        </div>
    )
}
