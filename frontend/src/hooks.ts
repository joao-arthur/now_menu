import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from "react-redux";
import type { appDispatch, appState } from "./store";

export const useAppSelector: TypedUseSelectorHook<appState> =
    useSelector;
export const useAppDispatch = () => useDispatch<appDispatch>();
