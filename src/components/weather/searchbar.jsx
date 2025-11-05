import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import searchIcon from "../../assets/icons/searchIcon.svg";
import "../../searchbar.css";

function SearchBar({ setCity, setCords }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        inputValue
      )}&count=1`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const loc = data.results[0];
      const cityName = loc.name;
      const coords = { lat: loc.latitude, lon: loc.longitude };

      setCity(cityName);
      setCords(coords);

      localStorage.setItem("city", cityName);
      localStorage.setItem("coords", JSON.stringify(coords));
    } else {
      toast.error("Wrong city! Select another one.");
    }
  };

  return (
    // Kontener główny wyszukiwarki
    <div className="w-78 border border-font rounded-xl flex flex-row xl:w-200 focus:border-acent 2xl:w-full 2xl:justify-center 2xl:place-items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="text-font p-1.5 w-65 focus:rounded-xl focus-within xl:w-9/10
        2xl:ml-2"
        placeholder="Search City"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      {/* Przycisk wyszukiwania */}
      <div
        className="w-full flex place-items-center justify-center cursor-pointer 2xl:place-content-end
        2xl:mr-6"
      >
        <button onClick={handleSearch}>
          <img className="w-7" src={searchIcon} alt="search icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
