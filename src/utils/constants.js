export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const initialCards = [
  {
    name: "Cappadocia",
    link: "https://images.unsplash.com/photo-1569530593440-e48dc137f7d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Bozcaada",
    link: "https://images.unsplash.com/photo-1583059934814-1c5043178d25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Santorini",
    link: "https://images.unsplash.com/photo-1560703649-e3055f28bcf8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Tbilisi",
    link: "https://images.unsplash.com/photo-1589786381692-3a58c80b3f9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
  },
  {
    name: "Phuket",
    link: "https://images.unsplash.com/photo-1494949360228-4e9bde560065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Great Wall of China",
    link: "https://images.unsplash.com/photo-1571822325911-c01620a65e86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
];

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
