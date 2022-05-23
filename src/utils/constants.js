export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const profileInfo = {
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__photo"
};

export const container = document.querySelector(".page");
export const profile = container.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const nameJobPopup = document.querySelector(".popup_type_name");
export const newPlaceForm = container.querySelector(".popup_type_place");
export const addingPlaceButton = profile.querySelector(".profile__add-button");
export const profileForm = document.querySelector(".popup__form");
export const bigImageForm = document.querySelector(".popup_type_image");
export const popupBigImage = bigImageForm.querySelector(".popup__big-image");
export const textFullScreen = bigImageForm.querySelector(".popup__text-fullscreen");
export const placeForm = document.querySelector(".popup__form_place");
export const avatarEdit = document.querySelector('.js-new-avatar-form');
export const trashIcon = document.querySelector('.element__trash');
