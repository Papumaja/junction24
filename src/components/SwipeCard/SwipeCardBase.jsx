import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SwipeCardBase() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const initialPosition = useRef({ x: 0, y: 0 });

  // Use MUI's theme and useMediaQuery to detect screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleSwipeEnd = () => {
    const threshold = window.innerWidth / 2;
    if (Math.abs(position.x) > threshold) {
      const toX = position.x > 0 ? window.innerWidth : -window.innerWidth;
      setPosition((prevPosition) => ({ x: toX, y: prevPosition.y }));
      // Implement your swipe action here
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const rotation = position.x / 20;

  // Define card styles based on screen size
  const cardStyles = isMobile
    ? {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        borderRadius: 0,
      }
    : {
        width: '375px', // Typical mobile screen width
        height: '667px', // Typical mobile screen height
        maxWidth: '80vw',
        maxHeight: '90vh',
        borderRadius: '16px',
      };

  return (
    <Card
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) translate(-50%, -50%)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
        ...cardStyles,
      }}
    >
      <CardContent style={{ padding: 0 }}>
        {/* Your card content goes here */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f5f5f5',
          }}
        >
          <h2 style={{ textAlign: 'center', marginTop: '50%' }}>Swipe Me!</h2>
        </div>
      </CardContent>
    </Card>
  );
}
