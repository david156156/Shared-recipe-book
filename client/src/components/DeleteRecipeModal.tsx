import { FunctionComponent } from "react";

interface DeleteRecipeModalProps {
  onDelete: () => void;
  onClose: () => void;
}

const DeleteRecipeModal: FunctionComponent<DeleteRecipeModalProps> = ({
  onClose,
  onDelete,
}) => {
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        aria-labelledby="deleteRecipeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteRecipeModalLabel">
                מחיקת מתכון
              </h5>
            </div>
            <div className="modal-body">
              האם אתה בטוח שברצונך למחוק את המתכון?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                סגור
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDelete}
              >
                מחק מתכון
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteRecipeModal;
