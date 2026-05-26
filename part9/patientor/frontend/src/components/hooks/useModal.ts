import { useState } from "react";

const useModal = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    return{
        modalOpen,
        error,
        openModal,
        closeModal
    };
};

export default useModal;