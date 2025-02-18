import Swal from "sweetalert2";
import "./Swal.css";


const SweetAlert = async (message) => {
  const result = await Swal.fire({
    title: 'Are you sure you want to delete this Post ?',
    text: message,
    icon: 'null',     //'warning' to 'null' to remove the icon !
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel',
      },
  });

  return result.isConfirmed;
};

export default SweetAlert;
