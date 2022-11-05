import { useState, createContext, useContext } from 'react';

type ModalContextType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const ModalContext = createContext<ModalContextType>({
  isVisible: false,
  setIsVisible: () => null,
});

const useProvideModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  return {
    isVisible,
    setIsVisible,
  };
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useProvideModal();

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
