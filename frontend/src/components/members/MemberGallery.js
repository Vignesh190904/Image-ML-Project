import React from 'react';
import './MemberGallery.css';

// You might want to fetch this data from your backend;
// for now, use a static array of objects describing members and their images.
const MEMBERS = [
  {
    name: "Lionel Messi",
    image: "http://localhost:5000/static/members/Messi.jpg"
  },
  {
    name: "Maria Sharapova",
    image: "http://localhost:5000/static/members/Maria.jpg"
  },
  {
    name: "Roger Federer",
    image: "http://localhost:5000/static/members/Roger.jpg"
  },
  {
    name: "Serena Williams",
    image: "http://localhost:5000/static/members/Serena.jpg"
  },
  {
    name: "Virat Kohli",
    image: "http://localhost:5000/static/members/Virat.jpg"
  }
  // Add more as needed
];

const MemberGallery = () => (
  <div className="member-gallery">
    <h3 className="gallery-title">Example Members</h3>
    <div className="gallery-grid">
      {MEMBERS.map((member) => (
        <div className="gallery-card" key={member.name}>
          <img
            src={member.image}
            alt={member.name}
            className="gallery-image"
            loading="lazy"
          />
          <div className="gallery-label">{member.name}</div>
        </div>
      ))}
    </div>
  </div>
);

export default MemberGallery;
