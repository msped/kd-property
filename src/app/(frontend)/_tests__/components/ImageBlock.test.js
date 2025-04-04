import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageBlock from '@/app/(frontend)/components/ImageBlock';

// Mock the next/image component
jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line @next/next/no-img-element
    default: (props) => <img {...props} alt={props.alt} data-testid="next-image" />,
}));

describe('ImageBlock', () => {
    it('renders the image correctly', () => {
        const block = {
            image: {
                url: '/test-image.jpg',
                alt: 'Test Image',
            },
        };
        render(<ImageBlock block={block} />);
        const image = screen.getByTestId('next-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/test-image.jpg');
        expect(image).toHaveAttribute('alt', 'Test Image');
    });

    it('renders default alt text if alt is not provided', () => {
        const block = {
            image: {
                url: '/test-image.jpg',
            },
        };
        render(<ImageBlock block={block} />);
        const image = screen.getByTestId('next-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Image Block');
    });

    it('does not render if image is not provided', () => {
        const block = {};
        render(<ImageBlock block={block} />);
        const image = screen.queryByTestId('next-image');
        expect(image).not.toBeInTheDocument();
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('renders with correct styling', () => {
        const block = {
            image: {
                url: '/test-image.jpg',
                alt: 'Test Image',
            },
        };
        render(<ImageBlock block={block} />);
        const container = screen.getByRole('presentation');
        expect(container).toHaveStyle('display: flex');
        expect(container).toHaveStyle('justify-content: center');
        expect(container).toHaveStyle('align-items: center');
        expect(container).toHaveStyle('width: 100%');
        expect(container).toHaveStyle('position: relative');
    });
});
