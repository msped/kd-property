"use client";

import React from 'react';
import Image from 'next/image';
import { Container, Box } from '@mui/material';

export default function ImageBlock({ block }) {
    const { image } = block;

    if (!image) {
        return null;
    }

    return (
        <Container maxWidth="md"> 
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                    aspectRatio: '16 / 9',
                }}
                role="presentation"
            >
                <Image
                    src={image.url}
                    alt={image.alt || 'Image Block'}
                    fill="true"
                    style={{
                        objectFit: 'contain',
                    }}
                    sizes="100vw"
                />
            </Box>
        </Container>
    );
}
