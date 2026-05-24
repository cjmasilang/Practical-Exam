import { toast } from "sonner";

export const showLoading = (message: string) => {
    return toast.loading(message);
};

export const hideLoading = (toastId: string | number) => {
    toast.dismiss(toastId);
};

export const showSuccess = (message: string) => {
    toast.success(message);
};

export const showError = (message: string) => {
    toast.error(message);
};
