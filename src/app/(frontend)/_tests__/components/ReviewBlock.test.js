import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewBlock from '@/app/(frontend)/components/ReviewBlock';

jest.mock('@payloadcms/richtext-lexical/react', () => ({
    RichText: ({ data }) => <div data-testid="rich-text">{JSON.stringify(data)}</div>,
}));

describe('ReviewBlock', () => {
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
        render(<ReviewBlock block={block} />);
        expect(screen.getByTestId('rich-text')).toHaveTextContent(JSON.stringify(block.content));
    });

    it('renders client name correctly', () => {
        const block = {
            client: 'Test Client',
        };
        render(<ReviewBlock block={block} />);
        expect(screen.getByText('- Test Client')).toBeInTheDocument();
    });

    it('renders "From our client:" text', () => {
        const block = {};
        render(<ReviewBlock block={block} />);
        expect(screen.getByText('From our client:')).toBeInTheDocument();
    });

    it('does not render content if not provided', () => {
        const block = {};
        render(<ReviewBlock block={block} />);
        const richText = screen.queryByTestId('rich-text');
        expect(richText).not.toBeInTheDocument();
    });

    it('does not render client if not provided', () => {
        const block = {};
        render(<ReviewBlock block={block} />);
        const client = screen.queryByText(/^-/);
        expect(client).not.toBeInTheDocument();
    });

    it('renders content and client together', () => {
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
            client: 'Test Client',
        };
        render(<ReviewBlock block={block} />);
        expect(screen.getByTestId('rich-text')).toHaveTextContent(JSON.stringify(block.content));
        expect(screen.getByText('- Test Client')).toBeInTheDocument();
    });
});
