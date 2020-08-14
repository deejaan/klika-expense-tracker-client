import { toast } from 'react-toastify';
import { toastId } from '../constants';

export const notify = (message, type) => {
  if (!toast.isActive(toastId)) {
    if (type === 'success') {
      toast.success(message, { toastId: toastId });
    } else {
      toast.error(message, { toastId: toastId });
    }
  }
};
