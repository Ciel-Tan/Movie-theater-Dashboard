import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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

export const toastNotify = (success, error, destination) => {
  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast.success(success);
      destination && router.push(destination);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, destination]);
};