import React from 'react';
import {
    Container,
    Typography,
    Grid2,
    Box,
} from '@mui/material';
import FormComponent from '@/app/(frontend)/components/FormComponent';

export const metadata = {
    title: 'Contact Us | KD Property',
    description: 'Get in touch with KD Property for any inquiries about our property developments. \
    Fill out our contact form and we will get back to you soon.'
}

export default function ContactUs() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" fontWeight={700} align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" align="center">
                    {"We'd love to hear from you. Please fill out the form below, and we'll get back to you as soon as possible."}
                </Typography>
            </Box>
            <Grid2 container justifyContent="center">
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <FormComponent data-testid="form-component" formId="1" />
                </Grid2>
            </Grid2>
        </Container>
    );
}
