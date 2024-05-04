import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import LoginForm from "components/Forms/LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const LoginModal = ({ isOpen, handleClose, handleLogin }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box>Login in system </Box>
            <Box>X</Box>
          </Box>
          <LoginForm
            handleLogin={handleLogin}
            isOpen={isOpen}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
