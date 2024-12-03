import { Modal } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";

const ConfirmDeleteModal = ({ visible, onCancel, onConfirm, name }) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Yes, Delete"
      cancelText="No, Cancel"
      icon={<MdDeleteOutline />}
    >
      <p>Are you sure you want to delete the {name}?</p>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ConfirmDeleteModal;
