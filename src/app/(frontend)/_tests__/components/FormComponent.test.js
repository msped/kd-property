// /Users/matthewedwards/Developer/kd-property/src/app/(frontend)/components/FormComponent.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormComponent from '@/app/(frontend)/components/FormComponent';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// Mock react-toastify
jest.mock('react-toastify', () => ({
    ...jest.requireActual('react-toastify'),
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

// Mock fetch
global.fetch = jest.fn();

describe('FormComponent', () => {
    beforeEach(() => {
        fetch.mockClear();
        toast.success.mockClear();
        toast.error.mockClear();
    });

    const mockCmsForm = {
        fields: [
            { id: 1, name: 'name', label: 'Name', blockType: 'text', required: true },
            { id: 2, name: 'email', label: 'Email', blockType: 'email', required: true },
            { id: 3, name: 'message', label: 'Message', blockType: 'textarea', required: false },
        ],
    };

    const renderComponent = (formId = "1") => {
        return render(
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <ToastContainer />
                    <FormComponent formId={formId} />
                </ThemeProvider>
            </AppRouterCacheProvider>
        );
    };

    it('renders without crashing', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => mockCmsForm,
        });
        renderComponent();
        await waitFor(() => expect(screen.getByLabelText(/name/i)).toBeInTheDocument());
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('renders form fields correctly', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => mockCmsForm,
        });
        renderComponent();
        await waitFor(() => expect(screen.getByLabelText(/name/i)).toBeInTheDocument());
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders submit button', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => mockCmsForm,
        });
        renderComponent();
        await waitFor(() => expect(screen.getByLabelText(/name/i)).toBeInTheDocument());
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('displays success toast and resets form on successful submission', async () => {
        fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockCmsForm) });
        renderComponent();
        await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument()); // Wait for form to render

        fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Your message has been sent!'));
        await waitFor(() => expect(screen.getByLabelText(/name/i).value).toBe(''));
        await waitFor(() => expect(screen.getByLabelText(/email/i).value).toBe(''));
        await waitFor(() => expect(screen.getByLabelText(/message/i).value).toBe(''));
    });

    it('displays error toast on failed submission', async () => {
        fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockCmsForm) });
        renderComponent();
        await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument()); // Wait for form to render

        fetch.mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({ message: 'Submission failed' }) });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Submission failed'));
    });

    it('displays generic error toast on network error', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => mockCmsForm,
        });
        fetch.mockRejectedValueOnce(new Error('Network error'));
        renderComponent();
        await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument());
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(toast.error).toHaveBeenCalledWith('An error occurred during form submission.'));
    });

    it('renders different field types', async () => {
        const mockCmsFormWithDifferentTypes = {
            fields: [
                { id: 1, name: 'name', label: 'Name', blockType: 'text', required: true },
                { id: 2, name: 'email', label: 'Email', blockType: 'email', required: true },
                { id: 3, name: 'message', label: 'Message', blockType: 'textarea', required: false },
                { id: 4, name: 'age', label: 'Age', blockType: 'number', required: false },
            ],
        };
        fetch.mockResolvedValueOnce({
            json: async () => mockCmsFormWithDifferentTypes,
        });
        renderComponent();
        await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument())
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => {
            expect(screen.getByLabelText(/name/i)).toHaveAttribute('type', 'text');
            expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
            expect(screen.getByLabelText(/message/i)).toHaveAttribute('rows');
            expect(screen.getByLabelText('Age')).toHaveAttribute('type', 'number');
        });
    });

    it('renders correctly with an empty fields array', async () => {
        const mockCmsFormWithEmptyFields = {
            fields: [],
        };
        fetch.mockResolvedValueOnce({
            json: async () => mockCmsFormWithEmptyFields,
        });
        renderComponent();
        await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument());
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.queryByRole('textbox')).toBeNull();
    });
});
