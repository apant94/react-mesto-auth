import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function EditAvatarPopup(props) {

  const { values, isValid, errors, handleChange, resetForm, resetValidation } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: values["avatar"],
    });
  };
  
  React.useEffect(() => {
    if (props.isOpen) {
      resetForm();
      resetValidation();
    }
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="avatar-input"
        type="url"
        name="avatar"
        value={values["avatar"] || ""}
        onChange={handleChange}
        className="popup__text popup__text_value_avatar popup__text_type_edit-avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__text-error avatar-input-error">{errors["avatar"]}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
