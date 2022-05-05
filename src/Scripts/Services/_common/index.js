import store from '@/store';
import { setToastData } from "@/store/actions";

const copyToClipboard = (element, withToast) => {
  element.select();
  element.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(element.value);
  withToast && store.dispatch(
    setToastData({ title: 'Copy to clipboard', type: 'success' })
  );
};

const HelpersService = {
  copyToClipboard
};

export default HelpersService;

