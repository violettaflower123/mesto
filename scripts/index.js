
const placesList = document.querySelector(".elements__box");
const cardTemplate = document.querySelector("#addPlace-template").content;
const container = document.querySelector(".page");
const showEditForm = container.querySelector(".popup_type_name");
const editNameForm = container.querySelector(".profile");
const editButton = editNameForm.querySelector(".profile__edit-button");
const closeButton = showEditForm.querySelector(".popup__close_name");
const newPlaceForm = container.querySelector(".popup_type_place");
const addPlaceButton = editNameForm.querySelector(".profile__add-button");
const closePlaceForm = newPlaceForm.querySelector(".popup__close_place");
const newPlaceSubmit = newPlaceForm.querySelector('.popup__button_place-add');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_el_heading");
const jobInput = formElement.querySelector(".popup__input_el_subheading");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const closeButtons = document.querySelectorAll('.popup__close');
const bigImageForm = document.querySelector('.popup_type_image');
const images = document.querySelectorAll('.element__image');
const bigImageClose = document.querySelector('.popup__close_image');
const popupBigImage = bigImageForm.querySelector('.popup__big-image');
const textFullScreen = bigImageForm.querySelector('.popup__text-fullscreen');
const popupList = document.querySelectorAll('.popup');
const popupFormPlace = document.querySelector('.popup__form_place');

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


const placeForm = document.querySelector(".popup__form_place");
const placeBox = document.querySelector(".element");


//open popups
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);

  const inputList = popup.querySelectorAll('.popup__input');
  const errorText = popup.querySelectorAll('.popup__error');
  const submitButton = popup.querySelector('.popup__button');

  errorText.forEach((error) => {
    error.textContent = '';
  });

  inputList.forEach((errorInput) => {
    errorInput.classList.remove('popup__input_type_error');
  });

  toggleButtonView(submitButton);

};

//close popups
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
  //clearPopup(popup);
};

function handleCloseButtonClick (evt) {
  closePopup(evt.target.closest('.popup'));
};

closeButtons.forEach((close) => {
  close.addEventListener('click', handleCloseButtonClick);
});

//добавить новую карточку
function addNewPlace(evt) {
  evt.preventDefault();

  const newCard = document.querySelector('.popup__item-place').value;
  const newLink = document.querySelector('.popup__item-link').value;

  renderCard(newCard, newLink, placesList);

  placeForm.reset();
  handleCloseButtonClick (evt);

}

placeForm.addEventListener("submit", addNewPlace);


//закрытие попапа при клике на ESC
const handleEscUp = (evt) => {
  //evt.preventDefault();

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
    //clearPopup(modalWondow);
  }
});
});

//name and job form
function openPopupName() {
formElement.reset();

openPopup(showEditForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

editButton.addEventListener("click", openPopupName);

//add-new-place form
function openPopupPlace() {
  popupFormPlace.reset();
  openPopup(newPlaceForm);
};

addPlaceButton.addEventListener("click", openPopupPlace);


function handlerProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  handleCloseButtonClick (evt);
};

formElement.addEventListener("submit", handlerProfileSubmit);


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
}



