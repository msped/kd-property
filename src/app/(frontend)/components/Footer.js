import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    Stack,
    IconButton,
    Divider,
    Grid2,
} from '@mui/material';
import Image from 'next/image';
import KDPropertyLogoPng from '/public/kd-property-circle.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
    return (
        <Typography
            variant='body2'
            sx={{
                color: "text.secondary",
                flexGrow: 1,
            }}
            align='center'
        >
            {"© "}
            <Link color="text.secondary" underline="none" href="/">
                Kev Daynes Property Developments Ltd
            </Link>{" "}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#fff',
                py: 6,
                width: "100%"
            }}
        >
            <Container maxWidth="md">
                <Grid2 container spacing={2} alignItems="flex-start" justifyContent="space-between">
                    {/* Logo */}
                    <Grid2 size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: {
                                    xs: 'center',
                                    md: 'flex-start',
                                }
                            }}
                            component={Link} href ='/'
                        >
                            <Image
                                alt="KD Property Developments"
                                src={KDPropertyLogoPng}
                                height={125}
                                width={125}
                                priority
                            />
                        </Box>
                    </Grid2>

                    {/* Links List */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Stack direction="row" spacing={2} sx={{
                            padding: 3,
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Link href="/" color="text.secondary" underline="hover">
                                Home
                            </Link>
                            <Link href="/our-work" color="text.secondary" underline="hover">
                                Our Work
                            </Link>
                            <Link href="/testimonials" color="text.secondary" underline="hover">
                                Testimonials
                            </Link>
                            <Link href="/contact" color="text.secondary" underline="hover">
                                Contact
                            </Link>
                        </Stack>
                    </Grid2>

                    {/* Social Media Links */}
                    <Grid2 size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: {
                                xs: 'center',
                                md: 'flex-end',
                                alignItems: 'center',
                            },
                            padding: 2
                        }}>
                            <IconButton
                                color="text.secondary"
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                
                            >
                                <FacebookIcon fontSize='large'/>
                            </IconButton>
                            <IconButton
                                color="text.secondary"
                                href="https://www.instagram.com/"
                                target="_blank"
                                aria-label="Instagram"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon fontSize='large'/>
                            </IconButton>
                            <IconButton
                                color="text.secondary"
                                href="https://www.linkedin.com/"
                                target="_blank"
                                aria-label="LinkedIn"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon fontSize='large'/>
                            </IconButton>
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Company Number */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                    Company Number: 13955766
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
};
