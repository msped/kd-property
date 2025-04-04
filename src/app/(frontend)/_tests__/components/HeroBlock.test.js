import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroBlock from '@/app/(frontend)/components/HeroBlock';

jest.mock('@payloadcms/richtext-lexical/react', () => ({
    RichText: ({ data }) => <div data-testid="rich-text">{JSON.stringify(data)}</div>,
}));

jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line @next/next/no-img-element
    default: (props) => <img {...props} alt={props.alt} data-testid="next-image" />,
}));

describe('HeroBlock', () => {
    it('renders heading and subheading correctly', () => {
        const block = {
        heading: 'Test Heading',
        subheading: {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'Test Subheading' }],
                        },
                    ],
                },
            },
        };
        render(<HeroBlock block={block} />);
        expect(screen.getByRole('heading', { name: 'Test Heading' })).toBeInTheDocument();
        expect(screen.getByTestId('rich-text')).toHaveTextContent(JSON.stringify(block.subheading));
    });

    it('renders image correctly', () => {
        const block = {
            image: {
                url: '/test-image.jpg',
                alt: 'Test Image',
            },
        };
        render(<HeroBlock block={block} />);
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
        render(<HeroBlock block={block} />);
        const image = screen.getByTestId('next-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Hero Image');
    });

    it('does not render image if not provided', () => {
        const block = {};
        render(<HeroBlock block={block} />);
        const image = screen.queryByTestId('next-image');
        expect(image).not.toBeInTheDocument();
    });

    it('renders without heading or subheading', () => {
        const block = {
            image: {
                url: '/test-image.jpg',
                alt: 'Test Image',
            },
        };
        render(<HeroBlock block={block} />);
        const heading = screen.queryByRole('heading');
        const richText = screen.queryByTestId('rich-text');
        expect(heading).not.toBeInTheDocument();
        expect(richText).not.toBeInTheDocument();
        expect(screen.getByTestId('next-image')).toBeInTheDocument();
    });
});
