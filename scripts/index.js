
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



const placesList = document.querySelector(".elements__box");
const cardTemplate = document.querySelector("#addPlace-template").content;
const container = document.querySelector(".page");
const nameJobPopup = container.querySelector(".popup_type_name");
const profile = container.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileCloseButton = nameJobPopup.querySelector(".popup__close_name");
const newPlaceForm = container.querySelector(".popup_type_place");
const addingPlaceButton = profile.querySelector(".profile__add-button");
const closingPlaceForm = newPlaceForm.querySelector(".popup__close_place");
const newPlaceSubmit = newPlaceForm.querySelector('.popup__button_place-add');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_el_heading");
const jobInput = formElement.querySelector(".popup__input_el_subheading");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupCloseButtons = document.querySelectorAll('.popup__close');
const bigImageForm = document.querySelector('.popup_type_image');
const bigImageClose = document.querySelector('.popup__close_image');
const popupBigImage = bigImageForm.querySelector('.popup__big-image');
const textFullScreen = bigImageForm.querySelector('.popup__text-fullscreen');
const popupList = document.querySelectorAll('.popup');
const popupFormPlace = document.querySelector('.popup__form_place');
const profileSaveButton = formElement.querySelector('.popup__button');
const image = document.querySelector('.element__image');
const element = document.querySelector('.element');
const placeForm = document.querySelector(".popup__form_place");
const placeBox = document.querySelector(".element");
const form = document.querySelector('.popup__form');


//создание карточки
class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }
//получаем шаблон
  _getTemplate () {
    const cardElement = document
    .querySelector("#addPlace-template")
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
//создаем карточку на основе шаблона
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  //открываем картинку big size
  _openBigPicture () {
    popupBigImage.src = this._link;
    textFullScreen.textContent = this._name;
    popupBigImage.alt = this._name;

    openPopup(bigImageForm);

  };

  //удаляем карточку
  _removeCard() {
    this._element.remove();
  };

  //ставим лайк
  _giveLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  };


  //навешиваем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
     this._removeCard();
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
     this._giveLike();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openBigPicture();
    });

  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  placesList.prepend(cardElement);
});




/*
//создание карточки на основе template
function createCard (place, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__text').textContent = place;
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = place;

  cardElement.querySelector('.element__trash').addEventListener('click', removeCard);
  cardElement.querySelector('.element__like').addEventListener('click', giveLike);

  cardElement.querySelector('.element__image').addEventListener('click', openBigPicture);

  return cardElement;
};

//поместить карточку в верстку
function renderCard (place, link, placesList) {

  const cardElement = createCard(place, link);

  placesList.prepend(cardElement);
}

initialCards.forEach(card => renderCard(card.name, card.link, placesList));

*/


//open popups
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
};

//close popups
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
};

function handleCloseButtonClick (evt) {
  closePopup(evt.target.closest('.popup'));
};


//добавить новую карточку
function addNewPlace(evt) {
  evt.preventDefault();

  const newCard = document.querySelector('.popup__item-place').value;
  const newLink = document.querySelector('.popup__item-link').value;


  const card = new Card(newCard, newLink);
  const cardElement = card.generateCard();

  placesList.prepend(cardElement);
  //const cardElement = card.generateCard(newCard, newLink, placesList);
  //renderCard(newCard, newLink, placesList);

  placeForm.reset();
  handleCloseButtonClick (evt);

}

placeForm.addEventListener("submit", addNewPlace);

//сабмит при клике на Enter
form.addEventListener('keydown', function (evt) {
  if(evt.code === "Enter") {
    form.submit();
  }
});

//закрытие попапа при клике на ESC
const handleEscUp = (evt) => {

  if (evt.code == 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

//закрытие попапа по клику на оверлей
popupList.forEach((modalWindow) => {
  modalWindow.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(modalWindow);
  }
});
});

//name and job form
function openPopupName() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  const inputList = nameJobPopup.querySelectorAll('.popup__input');
  const errorText = nameJobPopup.querySelectorAll('.popup__error');
  const submitButton = nameJobPopup.querySelector('.popup__button');

  errorText.forEach((error) => {
    error.textContent = '';
  });

  inputList.forEach((errorInput) => {
    errorInput.classList.remove('popup__input_type_error');
  });

  profileSaveButton.removeAttribute('disabled');
  profileSaveButton.classList.remove('popup__button_disabled');

  openPopup(nameJobPopup);
};

profileEditButton.addEventListener("click", openPopupName);

//add-new-place form
function openPopupPlace() {
  popupFormPlace.reset();
  openPopup(newPlaceForm);

  const inputList = popupFormPlace.querySelectorAll('.popup__input');
  const errorText = popupFormPlace.querySelectorAll('.popup__error');
  const submitButton = popupFormPlace.querySelector('.popup__button');

  errorText.forEach((error) => {
    error.textContent = '';
  });

  inputList.forEach((errorInput) => {
    errorInput.classList.remove('popup__input_type_error');
  });

  toggleButtonState(inputList, submitButton, popupFormPlace);
};

addingPlaceButton.addEventListener("click", openPopupPlace);


function handlerProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  handleCloseButtonClick (evt);
};

formElement.addEventListener("submit", handlerProfileSubmit);

/*
function giveLike (evt) {
  evt.target.classList.toggle('element__like_active');
};


function removeCard (evt) {
  evt.target.closest('.element').remove();
};



function openBigPicture (evt) {
  popupBigImage.src = evt.currentTarget.src;
  textFullScreen.textContent = evt.currentTarget.alt;
  popupBigImage.alt = textFullScreen.textContent;

  openPopup(bigImageForm);
};
*/


