import { Input } from "../../../Components/Input/Input";
import { menuInfoActions } from "../../../Domains/menuInfo";
import { useAppDispatch, useAppSelector } from "../../../hooks";

export function SearchBar() {
    const search = useAppSelector(({ menuInfo }) => menuInfo.search);
    const dispatch = useAppDispatch();

    return (
        <Input
            name="search"
            type="search"
            placeholder="Pesquisar por pratos, bebidas, etc."
            value={search}
            onChange={(newValue) =>
                dispatch(menuInfoActions.setSearch(newValue))}
        />
    );
}