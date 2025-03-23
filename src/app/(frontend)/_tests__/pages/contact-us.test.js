import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUs from '@/app/(frontend)/contact-us/page';

jest.mock('../../components/FormComponent', () => {
    return function MockFormComponent(props) {
        return <div data-testid="form-component" data-form-id={props.formId}>Mock Form Component</div>;
    };
});

describe('ContactUs Component', () => {
    test('renders the Contact Us heading', () => {
        render(<ContactUs />);
        const headingElement = screen.getByRole('heading', { name: /contact us/i });
        expect(headingElement).not.toBeNull();
    });

    test('renders the contact description text', () => {
        render(<ContactUs />);
        const descriptionElement = screen.getByText(/we'd love to hear from you/i);
        expect(descriptionElement).not.toBeNull();
    });

    test('renders the FormComponent', () => {
        render(<ContactUs />);
        const formComponentElement = screen.getByTestId('form-component');
        expect(formComponentElement).not.toBeNull();
    });
});
