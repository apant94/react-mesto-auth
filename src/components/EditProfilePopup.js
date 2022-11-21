import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, setValues, isValid, errors, handleChange, resetValidation } = useFormAndValidation();
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values["name"],
      about: values["about"],
    });
  };

  React.useEffect(() => {
    if (props.isOpen) {
      setValues({
        ...values,
        name: currentUser.name,
        about: currentUser.about,
      });
      resetValidation();
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        value={values["name"] || ""}
        onChange={handleChange}
        className="popup__text popup__text_value_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__text-error name-input-error">{errors["name"]}</span>
      <input
        id="job-input"
        type="text"
        name="about"
        value={values["about"] || ""}
        onChange={handleChange}
        className="popup__text popup__text_value_job"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__text-error job-input-error">{errors["about"]}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
