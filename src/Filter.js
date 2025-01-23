// Filter.js
import React from "react";
import { Select, DatePicker, Dropdown, Menu } from "antd";
import { Option } from "antd/lib/mentions";

const { RangePicker } = DatePicker;

const Filter = ({ handleCityChange, handleCategoryChange, handleDateChange }) => {
  return (
    <div className="filter-container">
      <h3>Filtrele</h3>
      <div className="filter-item">
        <label>İllere Göre</label>
        <Select style={{ width: "100%" }} placeholder="İl Seç" onChange={handleCityChange} allowClear>
          {/* List of options for city */}
          <Option value="Adana">Adana</Option>
          <Option value="Ankara">Ankara</Option>
          {/* Add all other cities */}
        </Select>
      </div>
      <div className="filter-item">
        <label>Kategorilere Göre</label>
        <Select style={{ width: "100%" }} placeholder="Kategori Seç" onChange={handleCategoryChange} allowClear>
          {/* List of options for categories */}
          <Option value="Spor">Spor</Option>
          <Option value="Sanat ve Eğlence">Sanat ve Eğlence</Option>
          {/* Add all other categories */}
        </Select>
      </div>
      <div className="filter-item">
        <label>Tarihe Göre</label>
        <RangePicker style={{ width: "100%" }} onChange={handleDateChange} placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]} />
      </div>
    </div>
  );
};

export default Filter;
