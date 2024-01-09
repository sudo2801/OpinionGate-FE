import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const CToast = () => <ToastContainer
    position={toast.POSITION.BOTTOM_RIGHT}
    theme="light"
    autoClose={2000}
/>;
