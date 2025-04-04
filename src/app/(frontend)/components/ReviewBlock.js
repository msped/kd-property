"use client"; // Add this line at the top

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Container, Box, Typography } from '@mui/material';

export default function ReviewBlock({ block }) {
    const { content, client } = block;

    return (
        <Container maxWidth="md"> 
            <Typography>
                From our client:
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                {content && (
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                            fontStyle: 'italic',
                            p: 2
                        }}
                    >
                        <RichText data={content} />
                    </Typography>
                )}
                {client && (
                    <Typography
                        variant="subtitle1"
                        component="p"
                        sx={{
                            alignSelf: 'flex-end',
                            fontStyle: 'italic',
                            px: 2,
                            pb: 2
                        }}
                    >
                        - {client}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
