import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [filters, setFilters] = useState({
    kategori: "",
    il: "",
    tarih: "",
    tur: "", // Tür filtresi için ekledik
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">ETKİNLİKLER (Tüm etkinlikler)</h2>
      <div className="filter-options">
        <div className="filter-item">
          <button className="filter-button">Kategori</button>
          {/* Açılır menü */}
          <select
            className="filter-select"
            onChange={(e) => handleFilterChange("kategori", e.target.value)}
            value={filters.kategori}
          >
            <option value="">Tüm Kategoriler</option>
            <option value="konser">Konser</option>
            <option value="spor">Spor</option>
            <option value="tiyatro">Tiyatro</option>
          </select>
        </div>

        <div className="filter-item">
          <button className="filter-button">İl</button>
          <select
            className="filter-select"
            onChange={(e) => handleFilterChange("il", e.target.value)}
            value={filters.il}
          >
            <option value="">Tüm İller</option>
            <option value="istanbul">İstanbul</option>
            <option value="ankara">Ankara</option>
            <option value="izmir">İzmir</option>
          </select>
        </div>

        <div className="filter-item">
          <button className="filter-button">Tarih</button>
          <input
            type="date"
            className="filter-date"
            onChange={(e) => handleFilterChange("tarih", e.target.value)}
            value={filters.tarih}
          />
        </div>

        <div className="filter-item">
          <button className="filter-button">Tür</button>
          <select
            className="filter-select"
            onChange={(e) => handleFilterChange("tur", e.target.value)}
            value={filters.tur}
          >
            <option value="">Tümü</option>
            <option value="kurs">Kurs</option>
            <option value="etkinlik">Etkinlik</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
