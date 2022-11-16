import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  ); 

  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : 'element__like'}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  };

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  };

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  return (
    <li className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="element__title-container">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__column">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__counter">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}
