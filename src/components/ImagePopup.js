function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image-item" />
        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
