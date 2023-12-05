import AuthService from "./authService";
import ToasterService from "./toasterService";

const interceptor = {
    requestHandler(request) {
        return request;
    },
    errorHandler(error = {}) {
        if (error.response?.status === 401) {
            ToasterService(error.response.data?.message, 4, "userlogout");
            AuthService.signOut();
        } else if (error.response?.status === 403) {
            ToasterService(error.response.data?.message, 4, "userlogout");
        }
        const res = {
            error: error.response?.data || error,
            status: false
        };
        return Promise.reject(res);
    },
    successHandler(response) {
        return {
            status: true,
            data: response.data?.data,
            ...(response.data?.message && { message: response.data.message })
        };
    }
};
export default interceptor;
