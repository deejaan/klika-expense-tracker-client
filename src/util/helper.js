import { toast } from 'react-toastify';

export const notify = (message, type) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else {
    toast.warning(message);
  }
};
