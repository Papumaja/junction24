import React, { useState, useRef, useEffect, useContext } from 'react';
import { Card, CardContent, useMediaQuery, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CardsContext } from '../../context/CardsContext';
import { SwipeCardContent } from './SwipeCardContent';

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

  // Check if there are any cards left
  if (currentIndex >= cards.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h2>No more cards</h2>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

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
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        borderRadius: 0,
      }
    : {
        width: '375px',
        height: '667px',
        maxWidth: '80vw',
        maxHeight: '90vh',
        borderRadius: '16px',
      };

  return (
    <Card
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) translate(-50%, -50%)`,
        transition: isDragging || swipeDirection === null ? 'none' : 'transform 0.5s ease-in-out',
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...cardStyles,
      }}
    >
      {currentCard.image && (
        <CardMedia
          component="img"
          image={currentCard.image}
          alt={currentCard.name}
          style={{ height: '60%', objectFit: 'cover' }}
        />
      )}
      <CardContent style={{ flexGrow: 1, padding: '16px' }}>
        <SwipeCardContent></SwipeCardContent>
      </CardContent>
    </Card>
  );
}