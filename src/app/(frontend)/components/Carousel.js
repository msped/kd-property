'use client';

import React, { useState, useEffect } from 'react';
import { Box, } from '@mui/material';
import Image from 'next/image';

const Carousel = ({ images, children, aspectRatio = '16 / 9'}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 7000);

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    return (
        <Box sx={{ position: 'relative' }} role="presentation">
            <Box
                sx={{
                    position: 'relative',
                    height: '80vh',
                    overflow: 'hidden',
                }}
            >
                {images.map((image, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                >
                    <Image
                        src={image.image.url}
                        alt={image.image.alt || `Carousel Image ${index + 1}`}
                        fill='true'
                        style={{ objectFit: 'cover' }}
                        sizes="100vh"
                    />
                </Box>
                ))}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white',
                        zIndex: 2,
                        padding: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Carousel;
