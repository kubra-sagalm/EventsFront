import React from "react";
import { Select, DatePicker } from "antd";
import "./Filters.css";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Filters = ({ filters, setFilters }) => {
  const handleCityChange = (value) => {
    setFilters({ ...filters, city: value });
  };

  const handleCategoryChange = (value) => {
    setFilters({ ...filters, category: value });
  };

  const handleDateChange = (dates) => {
    setFilters({ ...filters, dateRange: dates });
  };

  return (
    <div className="filter-container">
      <h3>Filtrele</h3>
      <div className="filter-item">
        <label>İllere Göre</label>
        <Select
          style={{ width: "100%" }}
          placeholder="İl Seç"
          onChange={handleCityChange}
          allowClear
        >
          {/* Şehir Seçenekleri */}
          {[
            "Adana",
            "İstanbul",
            "Ankara",
            "İzmir",
            "Antalya",
            // Daha fazla seçenek ekleyebilirsiniz
          ].map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>
      <div className="filter-item">
        <label>Kategorilere Göre</label>
        <Select
          style={{ width: "100%" }}
          placeholder="Kategori Seç"
          onChange={handleCategoryChange}
          allowClear
        >
          {[
            "Spor",
            "Sanat ve Eğlence",
            "Eğitim ve Atölyeler",
            "Teknoloji ve Bilim",
          ].map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </div>
      <div className="filter-item">
        <label>Tarihe Göre</label>
        <RangePicker
          style={{ width: "100%" }}
          onChange={handleDateChange}
          placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
          disabledDate={(current) => current && current < new Date()}
        />
      </div>
    </div>
  );
};

export default Filters;