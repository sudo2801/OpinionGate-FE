import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const CToast = () => <ToastContainer
    position={toast.POSITION.TOP_RIGHT}
    theme="light"
    autoClose={3000}
    hideProgressBar
/>;
