import { toast as rtToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const toast = {
  success: (message, options = {}) => {
    rtToast.success(message, { ...defaultOptions, ...options });
  },
  error: (message, options = {}) => {
    rtToast.error(message, { ...defaultOptions, ...options });
  },
};
