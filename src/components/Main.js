import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card";

function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div
            className="profile__edit-avatar"
            onClick={props.onEditAvatar}
          ></div>
        </div>
        <div className="profile__info">
          <div className="profile__first-line">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
