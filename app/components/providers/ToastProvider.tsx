import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

type Props = React.PropsWithChildren<{}>;

const ToastContext = createContext<
  | {
      visible: boolean;
      showErrorToast: () => void;
      dismissErrorToast: () => void;
    }
  | undefined
>(undefined);

const toastReducer = (state: { visible: boolean }, action: { type: 'show' | 'hide' }) => {
  switch (action.type) {
    case 'show':
      return { visible: true };
    case 'hide':
      return { visible: false };
    default:
      return state;
  }
};

export const ToastProvider = ({ children }: Props) => {
  const [{ visible }, dispatch] = useReducer(toastReducer, { visible: false });

  const showErrorToast = useCallback(() => {
    dispatch({ type: 'show' });
  }, []);

  const dismissErrorToast = useCallback(() => {
    dispatch({ type: 'hide' });
  }, []);

  const value = useMemo(
    () => ({ visible, showErrorToast, dismissErrorToast }),
    [visible, showErrorToast, dismissErrorToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
};
