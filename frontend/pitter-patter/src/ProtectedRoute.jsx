import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import AlertModal from "./AlertModal";

const ProtectedRoute = ({ element: Component }) => {
  const token = useSelector((state) => state.token.accessToken);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(!token);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    navigate('/login');
  };

  if (!token && !isModalOpen) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Component />
      <AlertModal isOpen={isModalOpen} onClose={handleClose} onConfirm={handleConfirm} />
    </>
  );
};

export default ProtectedRoute;
