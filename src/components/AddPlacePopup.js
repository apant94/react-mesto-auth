import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCards({
      name,
      link
    });
  };

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        type="text"
        name="name"
        value={name || ""}
        onChange={handleNameChange}
        className="popup__text popup__text_value_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__text-error place-input-error"></span>
      <input
        id="link-input"
        type="url"
        name="link"
        value={link || ""}
        onChange={handleLinkChange}
        className="popup__text popup__text_value_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__text-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
