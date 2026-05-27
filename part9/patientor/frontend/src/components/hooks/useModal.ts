import { useState } from "react";

const useModal = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const setErrorMessage = (message: string) => {
        setError(message);
    };

    return{
        modalOpen,
        error,
        openModal,
        closeModal,
        setErrorMessage
    };
};

export default useModal;