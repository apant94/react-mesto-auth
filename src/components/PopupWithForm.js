function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <form
        name={`popup-${props.name}`}
        id={`popup-${props.name}`}
        className={`popup__container popup__container_${props.name}`}
        onSubmit={props.onSubmit}
        noValidate
      >
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <div className="popup__wrapper">
          <h2 className="popup__definition">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupWithForm;
