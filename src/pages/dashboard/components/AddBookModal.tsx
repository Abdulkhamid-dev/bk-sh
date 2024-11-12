import * as React from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Button, Box, Typography, Stack, FormControl, FormLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { CustomAxiosRequestConfig, apiClient } from '@/utils';
import { setBookModalSetting, setLoading } from '@/redux/reducers/settingSlice';
import { addBook } from '@/redux/reducers/bookSlice';
import { EActionMode } from '@/type';

interface IFormInput {
    isbn: string;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookModal = () => {
    const dispatch = useAppDispatch()
    const { bookModal, loading } = useAppSelector((state) => state.settings)
    const [isbnError, setIsbnError] = React.useState(false);
    const [isbnErrorMessage, setIsbnErrorMessage] = React.useState('');

    const handleClose = () => {
        dispatch(setBookModalSetting({
            visible: false,
            mode: EActionMode.Add,
        }))
    }

    const validateInputs = () => {
        const isbn = document.getElementById('isbn') as HTMLInputElement;

        let isValid = true;

        if (!isbn.value || isbn.value.length < 13) {
            setIsbnError(true);
            setIsbnErrorMessage('Please enter a valid ISBN number');
            isValid = false;
        } else {
            setIsbnError(false);
            setIsbnErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isbnError) {
            return;
        }
        const formData = new FormData(event.currentTarget);
        let data = {
            isbn: formData.get('isbn'),
        };
        dispatch(setLoading({ key: "createBook", status: true }))
        try {
            const response = await apiClient.post('/books', data, {
                useAuthHeaders: true,
            } as CustomAxiosRequestConfig);
            dispatch(addBook({book: response.data.data, status: 0}))
            handleClose()
        } catch (error) {
            console.error('Error:', error);
        } finally {
            dispatch(setLoading({ key: "createBook", status: false }))
        }
    }


    return (
        <Modal
            open={bookModal.visible}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Book Details Form
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel htmlFor="isbn">ISBN</FormLabel>
                            <TextField
                                autoComplete="isbn"
                                name="isbn"
                                required
                                fullWidth
                                id="isbn"
                                placeholder="ISBN"
                                error={isbnError}
                                helperText={isbnErrorMessage}
                                color={isbnError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button disabled={loading.includes("createBook")} variant="contained" color="primary" type="submit" onClick={validateInputs}>
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
}


export default BookModal
