import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
  
  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        className="popup__text popup__text_value_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__text-error name-input-error"></span>
      <input
        id="job-input"
        type="text"
        name="about"
        value={description}
        onChange={handleDescriptionChange}
        className="popup__text popup__text_value_job"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__text-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
