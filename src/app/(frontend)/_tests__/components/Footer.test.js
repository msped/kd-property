/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/app/(frontend)/components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, width, height }) => (
        <img src={src} alt={alt} width={width} height={height} />
    ),
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children }) => <a href={href}>{children}</a>,
}));

describe('Footer Component', () => {
    const renderComponent = () =>
        render(
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <Footer />
                </ThemeProvider>
            </AppRouterCacheProvider>
        );

    it('renders without crashing', () => {
        renderComponent();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders the logo', () => {
        renderComponent();
        const logo = screen.getByAltText('KD Property Developments');
        expect(logo).toBeInTheDocument();
    });

    it('renders the copyright text', () => {
        renderComponent();
        const copyrightText = screen.getByText(/Kev Daynes Property Developments Ltd/i);
        expect(copyrightText).toBeInTheDocument();
    });

    it('renders the company number', () => {
        renderComponent();
        const companyNumber = screen.getByText(/Company Number: 13955766/i);
        expect(companyNumber).toBeInTheDocument();
    });

    it('renders the navigation links', () => {
        renderComponent();
        const homeLink = screen.getByRole('link', { name: /Home/i });
        const ourWorkLink = screen.getByRole('link', { name: /Our Work/i });
        const testimonialsLink = screen.getByRole('link', { name: /Testimonials/i });
        const contactUsLink = screen.getByRole('link', { name: /Contact Us/i });

        expect(homeLink).toBeInTheDocument();
        expect(ourWorkLink).toBeInTheDocument();
        expect(testimonialsLink).toBeInTheDocument();
        expect(contactUsLink).toBeInTheDocument();
    });

    it('renders the correct social media links', () => {
        renderComponent();
        const facebookLink = screen.getByRole('link', { name: /facebook/i });
        const instagramLink = screen.getByRole('link', { name: /instagram/i });
        const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
        expect(facebookLink).toBeInTheDocument();
        expect(instagramLink).toBeInTheDocument();
        expect(linkedInLink).toBeInTheDocument();
    });

    it('renders navigation links with correct hrefs', () => {
        renderComponent();
        const homeLink = screen.getByRole('link', { name: /Home/i });
        const ourWorkLink = screen.getByRole('link', { name: /Our Work/i });
        const testimonialsLink = screen.getByRole('link', { name: /Testimonials/i });
        const contactUsLink = screen.getByRole('link', { name: /Contact Us/i });
        expect(homeLink).toHaveAttribute('href', '/placeholder1');
        expect(ourWorkLink).toHaveAttribute('href', '/placeholder2');
        expect(testimonialsLink).toHaveAttribute('href', '/placeholder3');
        expect(contactUsLink).toHaveAttribute('href', '/placeholder4');
    });

    it('renders social media links with correct hrefs', () => {
        renderComponent();
        const facebookLink = screen.getByRole('link', { name: /facebook/i });
        const instagramLink = screen.getByRole('link', { name: /instagram/i });
        const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/');
        expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/');
        expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/');
    });

    it('renders logo link with the correct href', () => {
        renderComponent();
        const logoLink = screen.getByRole('link', {name: /KD Property Developments/i});
        expect(logoLink).toHaveAttribute('href', '/');
    })

    it('renders Copyright link with the correct href', () => {
        renderComponent();
        const copyrightLink = screen.getByRole('link', { name: /Kev Daynes Property Developments Ltd/i });
        expect(copyrightLink).toHaveAttribute('href', '/');
    });
});
