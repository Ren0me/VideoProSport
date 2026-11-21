"use client";

import { Modal } from "@shared/ui";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OpenModalOptions = {
  title: ReactNode;
  content: ReactNode;
};

type ModalContextValue = {
  openModal: (options: OpenModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<OpenModalOptions | null>(null);

  const openModal = useCallback((options: OpenModalOptions) => {
    setModal(options);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal open={modal !== null} title={modal?.title} onClose={closeModal}>
        {modal?.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return context;
};
