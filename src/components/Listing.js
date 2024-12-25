import React from "react";
import "./Listing.css";

const listings = [
  {
    id: 1,
    title: "132 Richmond",
    description: "Avg review 4.2, 423 WW",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "6 Fremont Street",
    description: "Avg review 4.8, 312 WW",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "84 Vista Street",
    description: "Avg review 4.5, 290 WW",
    image: "https://via.placeholder.com/150",
  },
];

const Listing = ({ onListingClick }) => {
  return (
    <div className="listings">
      <h2>Listings</h2>
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="list-item"
          onClick={() => onListingClick(listing)}
        >
          <img src={listing.image} alt={listing.title} />
          <div>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;
