// src/components/SwipeCard/SwipeCardBase.js

import React, { useState, useRef, useEffect, useContext } from 'react';
import { Card, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CardsContext } from '../../context/CardsContext';
import { SwipeCardContent } from './SwipeCardContent';
import SwipedRightCardsList from './SwipedRightCardsList';
import './SwipeCardBase.css';

export default function SwipeCardBase() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef(position);
  const [isDragging, setIsDragging] = useState(false);
  const initialPosition = useRef({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Consume the CardsContext
  const { cards, currentIndex, swipeCard } = useContext(CardsContext);

  // Update positionRef whenever position changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Handle mouse and touch events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    initialPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    initialPosition.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition({
        x: e.clientX - initialPosition.current.x,
        y: e.clientY - initialPosition.current.y,
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - initialPosition.current.x,
        y: touch.clientY - initialPosition.current.y,
      });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      handleSwipeEnd();
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      handleSwipeEnd();
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Handle swipe end logic
  const handleSwipeEnd = () => {
    const threshold = window.innerWidth / 4;
    const posX = positionRef.current.x;

    if (posX > threshold) {
      // Swiped right
      setSwipeDirection('right');
      setPosition({ x: window.innerWidth, y: position.y }); // Move off-screen to the right
    } else if (posX < -threshold) {
      // Swiped left
      setSwipeDirection('left');
      setPosition({ x: -window.innerWidth, y: position.y }); // Move off-screen to the left
    } else {
      // Reset position if swipe threshold is not met
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle the transition end event
  const handleTransitionEnd = () => {
    if (swipeDirection) {
      swipeCard(swipeDirection);
      setSwipeDirection(null);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Calculate rotation
  const rotation = position.x / 20;

  // Define card styles
  const cardStyles = isMobile
    ? {
        width: '90vw',
        height: '70vh',
        borderRadius: '20px',
      }
    : {
        width: '400px',
        height: '600px',
        borderRadius: '20px',
      };

  if (currentIndex >= cards.length) {
    // Filter the cards that were swiped right
    const swipedRightCards = cards.filter((card) => card.swiped === 'right');

    return (
      <div className="no-more-cards">
        <Typography variant="h5">No more cards</Typography>
        {swipedRightCards.length > 0 ? (
          <SwipedRightCardsList cards={swipedRightCards} />
        ) : (
          <Typography variant="h6">You have not liked any companies yet.</Typography>
        )}
      </div>
    );
  }

  return (
    <div className="swipe-card-container">
      <Card
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTransitionEnd={handleTransitionEnd}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) translate(-50%, -50%)`,
          transition:
            isDragging || swipeDirection === null ? 'none' : 'transform 0.5s ease-in-out',
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          overflow: 'hidden',
          ...cardStyles,
        }}
        elevation={8}
      >
        <SwipeCardContent />
      </Card>
    </div>
  );
}
