import React from 'react';
import './MemberGallery.css';

// Member data with placeholder content
const MEMBERS = [
  {
    name: "Lionel Messi",
    description: "Football Legend"
  },
  {
    name: "Maria Sharapova",
    description: "Tennis Champion"
  },
  {
    name: "Roger Federer",
    description: "Tennis Legend"
  },
  {
    name: "Serena Williams",
    description: "Tennis Champion"
  },
  {
    name: "Virat Kohli",
    description: "Cricket Star"
  }
];

const MemberGallery = () => {
  return (
    <div className="member-gallery">
      <h3 className="gallery-title">Example Members</h3>
      <div className="gallery-grid">
        {MEMBERS.map((member) => (
          <div className="gallery-card" key={member.name}>
            <div className="gallery-placeholder">
              <div className="placeholder-icon">👤</div>
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
