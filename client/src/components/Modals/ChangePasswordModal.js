import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import ChangePasswordForm from "components/Forms/ChangePasswordForm";

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
const ChangePasswordModal = ({ isOpen, handleClose, handleChangePassword }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <Box>CHANGE PASSWORD</Box>
            <Box onClick={handleClose}>X</Box>
          </Box>
          <ChangePasswordForm
            handleClose={handleClose}
            handleChangePass={handleChangePassword}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
