import { useEffect, useState, type ChangeEvent } from "react";
import "./Search.css";
import { useAppStore } from "../../stores/app.js";
import { useDebounce } from "../../hooks/useDebounce.js";
function Search() {
    const roadmap = useAppStore((state) => state.roadmap);
    const filteredRoadmap = useAppStore((state) => state.filteredRoadmap);
    const isFiltered = useAppStore((state) => state.isFiltered);
    const searchByTitle = useAppStore((state) => state.search);

    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 300);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const text = e.target.value;
        setSearchText(text);
    }

    useEffect(() => {
        searchByTitle(debouncedSearchText);
    }, [debouncedSearchText, searchByTitle]);

    if (roadmap.length === 0) return null;

    return (
        <div className="search">
            <input
                className="search-input"
                type="search"
                placeholder="Введите запрос"
                onChange={onChange}
            />
            {isFiltered && <div className="search-count">{filteredRoadmap.length}</div>}
        </div>
    );
}

export default Search;
