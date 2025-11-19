import type { ChangeEvent } from "react";
import "./Search.css";
import { useAppStore } from "../../stores/app.js";
function Search() {
    const roadmap = useAppStore((state) => state.roadmap);

    const searchByTitle = useAppStore((state) => state.searchByTitle);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const text = e.target.value;
        searchByTitle(text);
    }
    if (roadmap.length === 0) return null;

    return (
        <div className="search">
            <input
                className="search-input"
                type="search"
                placeholder="Введите запрос"
                onChange={onChange}
            />
        </div>
    );
}

export default Search;
