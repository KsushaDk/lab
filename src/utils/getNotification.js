import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successNotification, failedNotification } from 'Constants/constants';

export const getNotification = {
	failed: (message) => toast.error(message, failedNotification),
	success: (message) => toast.success(message, successNotification),
};
