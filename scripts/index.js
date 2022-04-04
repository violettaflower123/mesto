
const placesList = document.querySelector(".elements__box");
const cardTemplate = document.querySelector("#addPlace-template").content;
const container = document.querySelector(".page");
const showEditForm = container.querySelector(".popup_type_name");
const edit = container.querySelector(".profile");
const editButton = edit.querySelector(".profile__edit-button");
const closeButton = showEditForm.querySelector(".popup__close_name");
const newPlaceForm = container.querySelector(".popup_type_place");
const addPlaceButton = edit.querySelector(".profile__add-button");
const closePlaceForm = newPlaceForm.querySelector(".popup__close_place");
const newPlaceSubmit = newPlaceForm.querySelector('.popup__button_place-add');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__item_el_heading");
const jobInput = formElement.querySelector(".popup__item_el_subheading");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const closes = document.querySelectorAll('.popup__close');
const opens = document.querySelectorAll('.popup-open');
const bigImageForm = document.querySelector('.popup_type_image');
const images = document.querySelectorAll('.element__image');
const bigImageClose = document.querySelector('.popup__close_image');
const popupBigImage = bigImageForm.querySelector('.popup__big-image');
const textFullScreen = bigImageForm.querySelector('.popup__text-fullscreen');
const popup = document.querySelectorAll('.popup');

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


const placeContainer = document.querySelector(".popup__form_place");
const cardContainer = document.querySelector(".element");


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

closes.forEach((close) => {
  close.addEventListener('click', handleCloseButtonClick);
});

//добавить новую карточку
function addNewPlace(evt) {
  evt.preventDefault();

  const newCard = document.querySelector('.popup__item-place').value;
  const newLink = document.querySelector('.popup__item-link').value;

  renderCard(newCard, newLink, placesList);
  evt.currentTarget.reset();
  handleCloseButtonClick (evt);
}

placeContainer.addEventListener("submit", addNewPlace);


//закрытие попапа при клике на ESC
const handleEscUp = (evt) => {
  //evt.preventDefault();
  const activePopup = document.querySelector('.popup_opened');
  if (evt.keyCode == '27') {
    closePopup(activePopup);
  }
};


//закрытие попапа по клику на оверлей
popup.forEach((modalWindow) => {
  modalWindow.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(modalWindow);
  }
});
});

//name and job form
function openPopupName() {

openPopup(showEditForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

editButton.addEventListener("click", openPopupName);

//add-new-place form
function openPopupPlace() {
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


//open big picture
function openBigPicture (evt) {
    popupBigImage.src = evt.currentTarget.src;
    textFullScreen.textContent = evt.currentTarget.parentNode.textContent;
    openPopup(bigImageForm);
};
