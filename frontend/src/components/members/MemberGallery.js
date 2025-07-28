import React, { useState } from 'react';
import { getStaticAssetUrl } from '../../api/api';
import './MemberGallery.css';

// Member data with hosted backend URLs
const MEMBERS = [
  {
    name: "Lionel Messi",
    image: "static/members/Messi.jpg"
  },
  {
    name: "Maria Sharapova",
    image: "static/members/Maria.jpg"
  },
  {
    name: "Roger Federer",
    image: "static/members/Roger.jpg"
  },
  {
    name: "Serena Williams",
    image: "static/members/Serena.jpg"
  },
  {
    name: "Virat Kohli",
    image: "static/members/Virat.jpg"
  }
  // Add more as needed
];

const MemberGallery = () => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (memberName) => {
    setImageErrors(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  return (
    <div className="member-gallery">
      <h3 className="gallery-title">Example Members</h3>
      <div className="gallery-grid">
        {MEMBERS.map((member) => (
          <div className="gallery-card" key={member.name}>
            {imageErrors[member.name] ? (
              <div className="gallery-image-error">
                <span>Image not available</span>
              </div>
            ) : (
              <img
                src={getStaticAssetUrl(member.image)}
                alt={member.name}
                className="gallery-image"
                loading="lazy"
                onError={() => handleImageError(member.name)}
              />
            )}
            <div className="gallery-label">{member.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberGallery;
