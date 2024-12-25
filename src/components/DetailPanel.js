import React from "react";
import "./DetailPanel.css";

const DetailPanel = ({ selectedListing }) => {
  return (
    <div className="details">
      <h2>Details</h2>
      {selectedListing ? (
        <div>
          <h3>{selectedListing.title}</h3>
          <p>{selectedListing.description}</p>
          <img
            src={selectedListing.image}
            alt={selectedListing.title}
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        <p>Select an item from the list to view details here.</p>
      )}
    </div>
  );
};

export default DetailPanel;
