import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NotFound404, Home } from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <NotFound404/>
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />  
        </Provider>
    </React.StrictMode>,
)
