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

function SwipeCardPreview() {
    // Consume the CardsContext
    const { cards, currentIndex, swipeCard } = useContext(CardsContext);
    const currentCard = cards[currentIndex];
    return (
        <div>
            <Typography
            variant="body2"
            color="textSecondary"
            style={{ textAlign: 'center', marginTop: '8px' }}
            >
            {currentCard.description}
            </Typography>
        </div>
    );
}

function SwipeCardImage()
{
    // Consume the CardsContext
    const { cards, currentIndex, swipeCard } = useContext(CardsContext);
    const currentCard = cards[currentIndex];
    return <div className="SwipeCardImage">
        {currentCard.image && (
            <CardMedia
            component="img"
            image={currentCard.image}
            alt={currentCard.name}
            style={{ height: '60%', objectFit: 'cover' }}
            />
        )}
    </div>
}

export function SwipeCardContent()
{
    // Consume the CardsContext
    const { cards, currentIndex, swipeCard } = useContext(CardsContext);
    const currentCard = cards[currentIndex];

    // Check if there are any cards left
    if (currentIndex >= cards.length) {
        return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h2>No more cards</h2>
        </div>
        );
    }

    return (
        <div>
            <div className="SwipeCardTitle">
                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                {currentCard.name}
                </Typography>
            </div>
            <div className="SwipeCardCompatibility"></div>
            <SwipeCardPreview className="SwipeCardPreview"/>
            <div className="SwipeCardControls">
                <DislikeButton></DislikeButton>
                <DetailsButton></DetailsButton>
                <LikeButton></LikeButton>
            </div>
            <SwipeCardImage className="SwipeCardImage"/>
        </div>
    );
}