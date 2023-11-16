import { useRouteError } from "react-router-dom"

function NotFound404() {
    const error = useRouteError();

    return (
        <div className="bg-gray-700 text-gray-300 flex flex-col gap-4 justify-center items-center min-h-screen">
            <h1 className="font-bold">Uppss...</h1>
            <p>Sorry, unexpected error</p>
            <p>Page {error.statusText || error.message}</p>
        </div>
    )
}

export default NotFound404