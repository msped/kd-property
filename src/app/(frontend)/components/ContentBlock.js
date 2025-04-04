import React from 'react'
import { Container, Typography } from '@mui/material';
import { RichText } from '@payloadcms/richtext-lexical/react'; 

export default function ContentBlock({ block }) {
    const { heading, content } = block;

    return (
        <Container maxWidth='md'>
            { heading && <Typography variant='h5' component='h2'>
                {heading}
            </Typography>}
            { content && <Typography component='div'>
                <RichText data={content} />
            </Typography>}
        </Container>
    )
}
