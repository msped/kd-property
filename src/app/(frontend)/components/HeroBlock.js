"use client"

import { Box, Typography, Container } from '@mui/material';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';

export default function HeroBlock({ block }) {
    const { heading, subheading, image } = block;

    if (!heading && !subheading && !image) {
        return null;
    };

    return (
        <Container maxWidth='md'>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '65vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                marginTop: 3,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                },
            }}>
                {image && (
                    <Image
                        src={image.url}
                        alt={image.alt || 'Hero Image'}
                        fill="true"
                        style={{ objectFit: 'cover', zIndex: 0 }}
                    />
                )}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    {heading && (
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                            {heading}
                        </Typography>
                    )}
                    {subheading && (
                        <RichText data={subheading}/>
                    )}
                </Container>
            </Box>
        </Container>
    );
}
