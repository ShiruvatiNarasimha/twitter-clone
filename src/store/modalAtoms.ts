import { atom } from 'recoil';

export const loginModalAtom = atom({
    key: 'loginModalAtom',
    default: {
        isOpen: false,
    },
});

export const registerModalAtom = atom({
    key: 'registerModalAtom',
    default: {
        isOpen: false,
    },
});

export const editModalAtom = atom({
    key: "editModalAtom",
    default: {
        isOpen: false,
    }
});
