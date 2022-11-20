import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import InfoTooltip from "./InfoTooltip.js";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const history = useHistory();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const [isAuthOk, setIsAuthOk] = useState(true);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  // Authorization and registration
  const [loggedIn, setLoggedIn] = useState(false);

  const [headerEmail, setHeaderEmail] = useState("");

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(inputValues) {
    api
      .setProfileInfo(inputValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(inputValue) {
    api
      .setAvatar(inputValue)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((element) => element._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .setCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // login and register functionality
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsTooltipOpen(true);
        setIsAuthOk(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipOpen(true);
        setIsAuthOk(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push("/");
        setHeaderEmail(email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          history.push("/");
          setHeaderEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={headerEmail} onClick={handleLogout} />
        <Switch>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteClick={handleDeleteClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
          />
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isAuthOk={isAuthOk}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
