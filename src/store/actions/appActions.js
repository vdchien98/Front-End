import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE, // kieu nay ko truyen data
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    // kieeur nay truyen data
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal,
});

export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languageInput, //data truyen di
});
