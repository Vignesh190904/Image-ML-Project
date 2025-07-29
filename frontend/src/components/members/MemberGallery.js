import React from 'react';
import './MemberGallery.css';

// Import member images
import MessiImage from './members images/Messi.png';
import MariaImage from './members images/Maria.png';
import RogerImage from './members images/Roger.png';
import SerenaImage from './members images/Serena.png';
import ViratImage from './members images/Virat.png';

// Member data with imported images
const MEMBERS = [
  {
    name: "Lionel Messi",
    description: "Football Legend",
    image: MessiImage
  },
  {
    name: "Maria Sharapova",
    description: "Tennis Champion",
    image: MariaImage
  },
  {
    name: "Roger Federer",
    description: "Tennis Legend",
    image: RogerImage
  },
  {
    name: "Serena Williams",
    description: "Tennis Champion",
    image: SerenaImage
  },
  {
    name: "Virat Kohli",
    description: "Cricket Star",
    image: ViratImage
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
