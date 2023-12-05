import { toast } from "react-toastify";
import { CheckIfNotEmpty } from "./utils";

/**
 * to display toaster
 * @param message : message to show on toaster
 * @param type : type of notification ,
 * i.e. if empty them default toaster else
 * 1 : info
 * 2 : success
 * 3 : warning
 * 4 : error
 */

const toasterService = (message, type, id) => {
    const options = {
        toastId: id,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        maxOpened: 1,
        preventDuplicates: 1
    };

    if (CheckIfNotEmpty(message)) {
        switch (type) {
            case 1:
                toast.info(message, options);
                break;
            case 2:
                toast.success(message, options);
                break;
            case 3:
                toast.warn(message, options);
                break;
            case 4:
                toast.error(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    }
};
export default toasterService;
