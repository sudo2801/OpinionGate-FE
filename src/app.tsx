import { Provider } from "@state/providers";
import { Router } from '@router/router'
import { RouterProvider } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";


export function App() {
  return (
    <Provider>
     <RouterProvider router={Router} />
    </Provider>
  );
}
