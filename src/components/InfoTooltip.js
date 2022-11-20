function InfoTooltip({ onClose, isOpen, isAuthOk }) {
  return (
    <div className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__tooltip-container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div
          className={isAuthOk ? "popup__tooltip-icon" : "popup__tooltip-icon_error"}
        ></div>
        <p className="popup__tooltip-text">
          {isAuthOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
