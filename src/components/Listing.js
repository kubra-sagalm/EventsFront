import React from "react";
import "./Listing.css";

const listings = [
  {
    id: 1,
    title: "132 Richmond",
    description: "Avg review 4.2, 423 WW",
    image: "https://www.globalcareercounsellor.com/blog/wp-content/uploads/2018/05/Online-Career-Counselling-course.jpg",
  },
  {
    id: 2,
    title: "6 Fremont Street",
    description: "Avg review 4.8, 312 WW",
    image: "https://img.freepik.com/free-vector/development-strategy-online-service-platform-business-planning-idea-company-promotion-online-course-isolated-flat-illustration_613284-272.jpg?semt=ais_hybrid",
  },
  {
    id: 3,
    title: "84 Vista Street",
    description: "Avg review 4.5, 290 WW",
    image: "https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/05/23151218/BA-Courses.png",
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
