/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/(frontend)/components/Header';
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

describe('Header Component', () => {

    const renderComponent = (props = {}) =>
        render(
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <Header {...props} />
            </ThemeProvider>
        </AppRouterCacheProvider>
        );

    it('renders the logo', () => {
        renderComponent();
        const desktopLogo = screen.getAllByAltText('KD Property Developments')[0]; // Desktop centered logo
        const mobileLogo = screen.getAllByAltText('KD Property Developments')[1]; // mobile drawer logo
        expect(desktopLogo).toBeInTheDocument();
        expect(mobileLogo).toBeInTheDocument();
    });

    it('renders desktop navigation buttons', () => {
        renderComponent();
        const homeButton = screen.getByRole('link', { name: 'Home' });
        const ourWorkButton = screen.getByRole('link', { name: 'Our Services' });
        const testimonialsButton = screen.getByRole('link', { name: 'Testimonials' });
        const contactUsButton = screen.getByRole('link', { name: 'Contact' });

        expect(homeButton).toBeInTheDocument();
        expect(ourWorkButton).toBeInTheDocument();
        expect(testimonialsButton).toBeInTheDocument();
        expect(contactUsButton).toBeInTheDocument();
    });

    it('renders mobile navigation', () => {
        renderComponent();
        const menuButton = screen.getByRole('button', { name: /open drawer/i });
        expect(menuButton).toBeInTheDocument();
    });

    it('opens the mobile drawer when the menu button is clicked', () => {
        renderComponent();
        const menuButton = screen.getByRole('button', { name: /open drawer/i });
        fireEvent.click(menuButton);
        const drawer = screen.getByRole('presentation');
        expect(drawer).toBeInTheDocument();
    });

    it('closes the mobile drawer when the close button is clicked', () => {
        renderComponent();
        const menuButton = screen.getByRole('button', { name: /open drawer/i });
        fireEvent.click(menuButton);

        const closeButton = screen.getByTestId('ArrowBackIosIcon');
        fireEvent.click(closeButton);
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('renders mobile navigation links', () => {
        renderComponent();
        const menuButton = screen.getByRole('button', { name: /open drawer/i });
        fireEvent.click(menuButton);

        const homeButton = screen.getByRole('link', { name: 'Home' })
        const ourWorkButton = screen.getByRole('link', { name: 'Our Services' })
        const testimonialsButton = screen.getByRole('link', { name: 'Testimonials' })
        const contactUsButton = screen.getByRole('link', { name: 'Contact' })

        expect(homeButton).toBeInTheDocument();
        expect(ourWorkButton).toBeInTheDocument();
        expect(testimonialsButton).toBeInTheDocument();
        expect(contactUsButton).toBeInTheDocument();

    })

    it('renders desktop navigation links with correct hrefs', () => {
        renderComponent();
        const homeButton = screen.getByRole('link', { name: 'Home' });
        const ourWorkButton = screen.getByRole('link', { name: 'Our Services' });
        const testimonialsButton = screen.getByRole('link', { name: 'Testimonials' });
        const contactUsButton = screen.getByRole('link', { name: 'Contact' });

        expect(homeButton).toHaveAttribute('href', '/');
        expect(ourWorkButton).toHaveAttribute('href', '/services');
        expect(testimonialsButton).toHaveAttribute('href', '/testimonials');
        expect(contactUsButton).toHaveAttribute('href', '/contact');
    });
    
    it('renders mobile navigation links with correct hrefs', () => {
        renderComponent();
        const menuButton = screen.getByRole('button', { name: /open drawer/i });
        fireEvent.click(menuButton);
        const homeButton = screen.getByRole('link', { name: /home/i });
        const ourWorkButton = screen.getByRole('link', { name: /Our Services/i });
        const testimonialsButton = screen.getByRole('link', { name: /testimonials/i });
        const contactUsButton = screen.getByRole('link', { name: /contact/i });
        expect(homeButton).toHaveAttribute('href', '/');
        expect(ourWorkButton).toHaveAttribute('href', '/services');
        expect(testimonialsButton).toHaveAttribute('href', '/testimonials');
        expect(contactUsButton).toHaveAttribute('href', '/contact');
    });
});
