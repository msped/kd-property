import Link from 'next/link';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@/payload.config';

import {
    Container,
    Box,
    Typography,
    Card,
    CardMedia,
    Grid2,
    CardActionArea,
} from '@mui/material';


export const metadata = {
    title: 'Testimonials | KD Property',
    description: 'Read real testimonials from satisfied clients of KD Property. \
    Discover what others have to say about our property development services and \
    their experiences working with us.'
}

export default async function TestimonialsPage() {
    const payload = await getPayload({ config });

    const { docs: testimonials, totalDocs } = await payload.find({
        collection: 'testimonials',
        sort: '-date',
        depth: 1,
    });

    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center', minHeight: '45vh' }}>
            <Box my={3}>
                <Typography variant="h4" component="h1" fontWeight={600}>
                    Testimonials
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    See what our clients are saying about our services
                </Typography>
            </Box>

            {totalDocs > 0 ? (
                <Grid2 container spacing={4}>
                    {testimonials.map((testimonial) => {
                        const heroBlock = testimonial.layout.find(block => block.blockType === 'hero');
                        const heroImage = heroBlock?.image;

                        return (
                            <Grid2 size={{ xs: 12, md: 6 }} key={testimonial.id}>
                                <CardActionArea component={Link} href={`/testimonials/${testimonial.slug}`}>
                                    <Card sx={{ 
                                        position: 'relative',
                                        height: 300,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 2 
                                    }}>
                                        {heroImage && (
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    zIndex: 0,
                                                    '& img': {
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        height: '100%',
                                                    },
                                                }}
                                            >
                                                <Image
                                                    src={heroImage.url}
                                                    alt={heroImage.alt || 'Testimonial Hero Image'}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </CardMedia>
                                        )}
                                        <Box sx={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', p: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%' }}>
                                            <Typography component="h2" variant="h5" fontWeight={600}>
                                                {testimonial.title}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </CardActionArea>
                            </Grid2>
                        );
                    })}
                </Grid2>
            ) : (
                <Box mt={5}>
                    <Typography variant="body1" component="div">
                        {"It seems we don't have any testimonials published yet. Check back later!"}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
