import { getPayload } from 'payload';
import config from '@/payload.config';
import Link from 'next/link';
import { Container, Typography, Stack, Button, Box } from '@mui/material';

import HeroBlock from '@/app/(frontend)/components/HeroBlock';
import ContentBlock from '@/app/(frontend)/components/ContentBlock';
import ImageBlock from '@/app/(frontend)/components/ImageBlock';
import ReviewBlock from '@/app/(frontend)/components/ReviewBlock';

const blockComponents = {
    hero: HeroBlock,
    content: ContentBlock,
    image: ImageBlock,
    review: ReviewBlock,
};

const renderBlock = (block) => {
    const Component = blockComponents[block.blockType];
    return Component ? <Component block={block} key={block.id} /> : null;
};

export default async function TestimonialPage({ params }) {
    const { slug } = await params;
    
    try {
        const payload = await getPayload({ config });
        
        const { docs: [testimonial] = [{}] } = await payload.find({
            collection: 'testimonials',
            where: { slug: { equals: slug } },
            depth: 1,
        });

        const renderContent = testimonial && testimonial.layout 
            ? testimonial.layout.map(renderBlock) 
            : (
                <>
                    <Typography variant='h4' component='h1' fontWeight={500}>
                        Testimonial not found.
                    </Typography>
                    <Button variant='contained' component={Link} href='/testimonials' aria-label='Back to Testimonials'>
                        Back to Testimonials
                    </Button>
                </>
            );

        return (
            <Container maxWidth="lg" sx={{ minHeight: '45vh' }}>
                <Stack direction="column" spacing={5} my={2} justifyContent="center" alignItems="center">
                    {renderContent}
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 4,
                            width: '100%',
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                            Ready to Transform Your Property?
                        </Typography>
                        <Typography variant="body1" component='p'>
                            {"If you're looking to develop your property and achieve results like these, let's discuss your project."}
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            href="/contact"
                            aria-label="Contact Us"
                            sx={{
                                mt: 2,
                                px: 4,
                                py: 1,
                            }}
                        >
                            Get in Touch
                        </Button>
                    </Box>
                </Stack>
            </Container>
        );
    } catch (error) {
        console.error('Failed to fetch testimonial:', error);
        return (
            <Container maxWidth="lg" sx={{ minHeight: '45vh' }}>
                <Stack direction="column" spacing={5} my={2} justifyContent="center" alignItems="center">
                    <Typography variant='h4' component='h1' fontWeight={500}>
                        An error occurred while fetching the testimonial.
                    </Typography>
                    <Button variant='contained' component={Link} href='/testimonials' aria-label='Back to Testimonials'>
                        Back to Testimonials
                    </Button>
                </Stack>
            </Container>
        );
    }
}
