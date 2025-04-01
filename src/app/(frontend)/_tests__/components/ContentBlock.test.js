import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentBlock from '@/app/(frontend)/components/ContentBlock';

// Mock the RichText component
jest.mock('@payloadcms/richtext-lexical/react', () => ({
    RichText: ({ data }) => <div data-testid="rich-text">{JSON.stringify(data)}</div>,
}));

describe('ContentBlock', () => {
    it('renders heading correctly', () => {
        const block = {
            heading: 'Test Heading',
        };
        render(<ContentBlock block={block} />);
        expect(screen.getByRole('heading', { name: 'Test Heading' })).toBeInTheDocument();
    });

    it('renders content correctly', () => {
        const block = {
        content: {
            root: {
                children: [
                    {
                        type: 'paragraph',
                        children: [{ text: 'Test Content' }],
                    },
                ],
            },
        },
        };
        render(<ContentBlock block={block} />);
        expect(screen.getByTestId('rich-text')).toHaveTextContent(JSON.stringify(block.content));
    });

    it('does not render heading if not provided', () => {
        const block = {
            content: {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'Test Content' }],
                        },
                    ],
                },
            },
        };
        render(<ContentBlock block={block} />);
        const heading = screen.queryByRole('heading');
        expect(heading).not.toBeInTheDocument();
        expect(screen.getByTestId('rich-text')).toBeInTheDocument();
    });

    it('does not render content if not provided', () => {
        const block = {
            heading: 'Test Heading',
        };
        render(<ContentBlock block={block} />);
        const richText = screen.queryByTestId('rich-text');
        expect(richText).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Test Heading' })).toBeInTheDocument();
    });

    it('renders heading and content together', () => {
        const block = {
            heading: 'Test Heading',
            content: {
                root: {
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'Test Content' }],
                        },
                    ],
                },
            },
        };
        render(<ContentBlock block={block} />);
        expect(screen.getByRole('heading', { name: 'Test Heading' })).toBeInTheDocument();
        expect(screen.getByTestId('rich-text')).toHaveTextContent(JSON.stringify(block.content));
    });
});
