import { Input } from "@/components/Input/Input";
import { useMenuInfoStore } from "@/lib/menu/useMenuInfoStore";

export function SearchBar() {
    const { search, setSearch } = useMenuInfoStore();

    return (
        <Input
            name="search"
            type="search"
            placeholder="Pesquisar por pratos, bebidas, etc."
            value={search}
            onChange={(newValue) => setSearch(newValue)}
        />
    );
}
