import React from 'react';
import './MemberGallery.css';

// Member data with absolute URLs for GitHub Pages
const MEMBERS = [
  {
    name: "Lionel Messi",
    description: "Football Legend",
    image: "https://vignesh190904.github.io/members/Messi.png"
  },
  {
    name: "Maria Sharapova",
    description: "Tennis Champion",
    image: "https://vignesh190904.github.io/members/Maria.png"
  },
  {
    name: "Roger Federer",
    description: "Tennis Legend",
    image: "https://vignesh190904.github.io/members/Roger.png"
  },
  {
    name: "Serena Williams",
    description: "Tennis Champion",
    image: "https://vignesh190904.github.io/members/Serena.png"
  },
  {
    name: "Virat Kohli",
    description: "Cricket Star",
    image: "https://vignesh190904.github.io/members/Virat.png"
  }
];

const MemberGallery = () => {
  return (
    <div className="member-gallery">
      <h3 className="gallery-title">Example Members</h3>
      <div className="gallery-grid">
        {MEMBERS.map((member) => (
          <div className="gallery-card" key={member.name}>
            <div className="gallery-image-container">
              <img
                src={member.image}
                alt={member.name}
                className="gallery-image"
                onError={(e) => {
                  console.log('Image failed to load:', member.image);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="gallery-placeholder" style={{ display: 'none' }}>
                <div className="placeholder-icon">👤</div>
              </div>
            </div>
            <div className="gallery-label">{member.name}</div>
            <div className="gallery-description">{member.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberGallery;
