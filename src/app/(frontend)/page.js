import { getPayload } from 'payload';
import config from '@/payload.config';
import Carsouel from "@/app/(frontend)/components/Carousel";
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';

export const metadata = {
  title: 'KD Property',
  description: ''
}

export default async function Home() {

  const payload = await getPayload({ config });

  const { docs: images } = await payload.find({
      collection: 'hero-images',
      depth: 1,
  });

  return (
    <Box sx={{
        position: 'relative',
        zIndex: 0,
        width: '100%',
      }}
    >
      <Carsouel images={images[0].images}>
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
          <Typography variant='h3' component='h1' fontWeight={600} color='white'>
            KD Property Development
          </Typography>
          <Button href='/contact' variant='contained'>
            Build your dream
          </Button>
        </Stack>
      </Carsouel>
    </Box>
  );
}
