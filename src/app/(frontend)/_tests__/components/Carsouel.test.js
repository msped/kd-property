import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '@/app/(frontend)/components/Carousel';

// Mock the next/image component
jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line @next/next/no-img-element
    default: (props) => <img {...props} alt={props.alt} data-testid="next-image" />,
}));

// Mock the setInterval and clearInterval
jest.useFakeTimers();

describe('Carousel', () => {
    const mockImages = [
        { image: { url: '/image1.jpg', alt: 'Image 1' } },
        { image: { url: '/image2.jpg', alt: 'Image 2' } },
        { image: { url: '/image3.jpg', alt: 'Image 3' } },
    ];

    it('renders the correct number of images', () => {
        render(<Carousel images={mockImages} />);
        const images = screen.getAllByTestId('next-image');
        expect(images.length).toBe(3);
    });

    it('renders the first image initially', () => {
        render(<Carousel images={mockImages} />);
        const firstImage = screen.getAllByTestId('next-image')[0];
        expect(firstImage).toHaveAttribute('src', '/image1.jpg');
        expect(firstImage).toHaveAttribute('alt', 'Image 1');
    });

    it('renders default alt text if alt is not provided', () => {
        const images = [{ image: { url: '/image1.jpg' } }];
        render(<Carousel images={images} />);
        const image = screen.getByTestId('next-image');
        expect(image).toHaveAttribute('alt', 'Carousel Image 1');
    });

    it('cycles to the next image after the interval', async () => {
        render(<Carousel images={mockImages} />);
        const firstImage = screen.getAllByTestId('next-image')[0];
        expect(firstImage).toHaveAttribute('src', '/image1.jpg');

        await act( async () => jest.advanceTimersByTime(7000));
        
        await waitFor(() => {
            const secondImage = screen.getAllByTestId('next-image')[1];
            expect(secondImage).toHaveAttribute('src', '/image2.jpg');
        });
    });

    it('cycles back to the first image after the last image', async () => {
        render(<Carousel images={mockImages} />);
        await act( async () => jest.advanceTimersByTime(7000));
        await waitFor(() => {
            const secondImage = screen.getAllByTestId('next-image')[1];
            expect(secondImage).toHaveAttribute('src', '/image2.jpg');
        });
        
        await act( async () => jest.advanceTimersByTime(7000));
        await waitFor(() => {
            const thirdImage = screen.getAllByTestId('next-image')[2];
            expect(thirdImage).toHaveAttribute('src', '/image3.jpg');
        });

        await act( async () => jest.advanceTimersByTime(7000));
        await waitFor(() => {
            const firstImage = screen.getAllByTestId('next-image')[0];
            expect(firstImage).toHaveAttribute('src', '/image1.jpg');
        });
    });

    it('renders children correctly', () => {
        render(
            <Carousel images={mockImages}>
                <div data-testid="child-content">Child Content</div>
            </Carousel>
        );
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
        expect(screen.getByTestId('child-content')).toHaveTextContent('Child Content');
    });

    it('renders with correct styling', () => {
        render(<Carousel images={mockImages} />);
        const carouselContainer = screen.getByRole('presentation');
        expect(carouselContainer).toHaveStyle('position: relative');
        const imageContainer = carouselContainer.firstChild;
        expect(imageContainer).toHaveStyle('position: relative');
        expect(imageContainer).toHaveStyle('height: 80vh');
        expect(imageContainer).toHaveStyle('overflow: hidden');
        const heroContainer = imageContainer.lastChild;
        expect(heroContainer).toHaveStyle('position: absolute');
        expect(heroContainer).toHaveStyle('top: 0px');
        expect(heroContainer).toHaveStyle('left: 0px');
        expect(heroContainer).toHaveStyle('width: 100%');
        expect(heroContainer).toHaveStyle('height: 100%');
        expect(heroContainer).toHaveStyle('display: flex');
        expect(heroContainer).toHaveStyle('flex-direction: column');
        expect(heroContainer).toHaveStyle('justify-content: center');
        expect(heroContainer).toHaveStyle('align-items: center');
        expect(heroContainer).toHaveStyle('text-align: center');
        expect(heroContainer).toHaveStyle('color: white');
        expect(heroContainer).toHaveStyle('z-index: 2');
        expect(heroContainer).toHaveStyle('padding: 40px');
        expect(heroContainer).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)');
    });
});
