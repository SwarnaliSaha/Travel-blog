import React, { useEffect, useState, useRef } from "react";
import "./BlogCard.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function BlogCard({ blog }) {
  const [cards, setCards] = useState([]);
  const [isLayoutCalculated, setIsLayoutCalculated] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const placeRef = useRef(null);

  useEffect(() => {
    if (
      cardRef.current &&
      headerRef.current &&
      placeRef.current &&
      !isLayoutCalculated
    ) {
      const cardHeight = cardRef.current.clientHeight;
      const headerHeight = headerRef.current.clientHeight;
      const placeHeight = placeRef.current.clientHeight;

      const placesInFirstCard = Math.floor(cardHeight / placeHeight);
      const placesInOtherCards = Math.floor(cardHeight / placeHeight);

      const newCards = [];
      let remainingPlaces = [...blog.places];

      // newCards.push(remainingPlaces.slice(0, placesInFirstCard));
      // remainingPlaces = remainingPlaces.slice(placesInFirstCard);

      while (remainingPlaces.length > 0) {
        newCards.push(remainingPlaces.slice(0, placesInOtherCards));
        remainingPlaces = remainingPlaces.slice(placesInOtherCards);
      }

      setCards(newCards);
      setIsLayoutCalculated(true);
    }
  }, [blog, isLayoutCalculated]);

  const getCardStyle = (cardIndex) => {
    const baseZIndex = cards.length;

    return {
      position: "absolute",
      left: `${cardIndex * 60}px`,
      zIndex:
        cardIndex === activeCardIndex ? baseZIndex + 1 : baseZIndex - cardIndex,
      transition: "left 0.3s ease, z-index 0.3s ease",
      // height: cardIndex !== 0 ? `${100 - cardIndex - 15}%` : "90vh",
      overflowY: cardIndex === 0 ? "auto" : "hidden",
      cursor: cardIndex != 0 ? "pointer" : "initial",
    };
  };

  const handleCardClick = (clickIndex) => {
    if (clickIndex != activeCardIndex) {
      const newSetOfCards = [...cards];
      const clickedCard = cards[clickIndex];
      newSetOfCards.splice(clickIndex, 1);
      newSetOfCards.unshift(clickedCard);
      setCards(newSetOfCards);
      setActiveCardIndex(0);
    }
  };

  if (!isLayoutCalculated) {
    return (
      <div className="blog--card" ref={cardRef}>
        <div className="card--header-section" ref={headerRef}>
          <img src={blog.image} alt="" className="blog--main-image" />
          <div className="header-section--label">{blog.name}</div>
        </div>
        <div className="blog--places">
          <div className="blog--single-place" ref={placeRef}>
            {blog.places[0] && (
              <>
                <div className="place--header-desc">
                  <div className="place--header--title">
                    {blog.places[0].name} - {blog.places[0].header}
                  </div>
                  <div className="place--description">
                    {blog.places[0].description}
                  </div>
                </div>
                <div className="place--image-container">
                  <img
                    src={blog.places[0].image}
                    alt=""
                    className="place-image"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog--cards-container">
      {cards.map((cardPlaces, cardIndex) => (
        <div>
          <div
            className="blog--card"
            style={getCardStyle(cardIndex)}
            key={cardIndex}
            onClick={() => handleCardClick(cardIndex)}
          >
            {cardIndex === 0 && (
              <div className="card--header-section">
                <AttachFileIcon
                  fontSize="large"
                  className="blog-cards--clip--first-card"
                />
                <img src={blog.image} alt="" className="blog--main-image" />
                <div className="header-section--label">{blog.name}</div>
              </div>
            )}
            {cardIndex !== 0 && (
              <AttachFileIcon fontSize="large" className="blog-cards--clip" />
            )}
            <div className="blog--places">
              {cardPlaces.map((place, placeIndex) =>
                placeIndex % 2 === 0 ? (
                  <div className="blog--single-place" key={placeIndex}>
                    <div className="place--header-desc">
                      <div className="place--header--title">
                        {place.name} - {place.header}
                      </div>
                      <div className="place--description">
                        {place.description}
                      </div>
                    </div>
                    <div className="place--image-container">
                      <img src={place.image} alt="" className="place-image" />
                    </div>
                  </div>
                ) : (
                  <div className="blog--single-place" key={placeIndex}>
                    <div className="place--image-container">
                      <img src={place.image} alt="" className="place-image" />
                    </div>
                    <div className="place--header-desc">
                      <div className="place--header--title">
                        {place.name} - {place.header}
                      </div>
                      <div className="place--description">
                        {place.description}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
