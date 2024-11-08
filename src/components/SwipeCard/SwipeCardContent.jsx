import React, { useState, useRef, useEffect, useContext } from 'react';
import { Card, CardContent, useMediaQuery, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CardsContext } from '../../context/CardsContext';
import '../../index.css'
import './SwipeCardContent.css'

function LikeButton()
{
    return <button>btn</button>
}
function DetailsButton()
{
    return <button>btn</button>
}

function DislikeButton()
{
    return <button>btn</button>
}

export function SwipeCardContent()
{
    // Consume the CardsContext
    const { cards, currentIndex, swipeCard } = useContext(CardsContext);

    // Check if there are any cards left
    if (currentIndex >= cards.length) {
        return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h2>No more cards</h2>
        </div>
        );
    }

    const currentCard = cards[currentIndex];
    return (
        <div>
            <div className="SwipeCardTitle">Test Card</div>
            <div className="SwipeCardImage">
                {currentCard.image && (
                    <CardMedia
                    component="img"
                    image={currentCard.image}
                    alt={currentCard.name}
                    style={{ height: '60%', objectFit: 'cover' }}
                    />
                )}
            </div>
            <div className="SwipeCardCompatibility"></div>
            <div className="SwipeCardPreview">
                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                {currentCard.name}
                </Typography>
                <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: 'center', marginTop: '8px' }}
                >
                {currentCard.description}
                </Typography>
            </div>
            <div className="SwipeCardControls">
                <DislikeButton></DislikeButton>
                <DetailsButton></DetailsButton>
                <LikeButton></LikeButton>
            </div>
        </div>
    );
}