import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
    avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-input"
        type="url"
        name="avatar"
        className="popup__text popup__text_value_avatar popup__text_type_edit-avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__text-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
