'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, Button, Box, Skeleton } from '@mui/material';
import { toast } from 'react-toastify';

const honeypotName = 'Address'

export default function FormComponent({ formId }) {
    const [cmsForm, setCmsForm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        fetch(`/api/forms/${formId}`)
        .then((res) => res.json())
        .then((data) => {
            setCmsForm(data)})
        .catch((err) => setError(err))
    }, [formId])

    const isHoneypotFilled = useCallback((formData) => {
        return formData.get(honeypotName) !== '';
    }, []);


    const handleSubmit = async (e) => {
        setIsLoading(true)
        if (isHoneypotFilled(new FormData(e.currentTarget))) {
            setIsLoading(false);
            return;
        }

        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.delete(honeypotName)

        const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
            field: name, 
            value: value.toString(),
        }))

        try {
            const response = await fetch('api/form-submissions', {
                method: 'POST',
                body: JSON.stringify({
                    form: formId,
                    submissionData: dataToSend,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                toast.success('Your message has been sent!');
                formRef.current?.reset();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'An error occurred during form submission.');
            }
        } catch (error) {
            toast.error('An error occurred during form submission.');
        }

        setIsLoading(false)
    }

    if (!cmsForm) {
        return (
            <Box>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rounded"
                        width="100%"
                        height={80}
                        sx={{ my: 1 }}
                    />
                ))}
                <Skeleton variant="rounded" width="30%" height={50} sx={{ my: 1, mx: 'auto' }} />
            </Box>
        );
    }

    const fieldType = (type) => {
        switch (type) {
            case 'text':
                return 'text';
            case 'textarea':
                return 'textarea';
            case 'number':
                return 'number';
            case 'email':
                return 'email';
            default:
                return null;
        }
    }


    return (
        <form onSubmit={handleSubmit} ref={formRef} aria-label="form">
            {cmsForm.fields.map((field) => {
                return (
                    <TextField
                        key={field.id}
                        name={field.name}
                        label={field.label}
                        type={fieldType(field.blockType)}
                        multiline={field.blockType === 'textarea'}
                        rows={field.blockType === 'textarea' ? 6 : null}
                        required={field.required}
                        variant='outlined'
                        fullWidth
                        margin='normal'
                    />
                )}
            )}
            <TextField
                name={honeypotName}
                type="text"
                sx={{
                    display: 'none'
                }}
            />
            <Box
                display="flex" 
                justifyContent="center"
                alignItems="center"
                mt={3}
            >
                <Button type='submit' variant='contained' loading={isLoading} color='primary'>
                    Send message
                </Button>
            </Box>
        </form>
    )
}
