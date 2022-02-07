import React from 'react';
import { Box, Modal } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Button from '@mui/material/Button';

export function PatientModal({ open, handleClose }) {
    const [pickedDrugList, setPickedDrugList] = useState('');

    const textFieldOutline = (props) => (
        <TextField {...props} margin="normal" fullWidth />
    );

    const style = {
        position: 'absolute',
        top: '48%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    };
    const drugsList = [
        { title: 'blabla' },
        { title: 'blibli' },
        { title: 'blublu' },
    ];

    const getValues = (event, value) => {
        setPickedDrugList((prev) => (prev = value));
    };

    const updatePateient = (values) => {
        console.log('from update patient', {
            ...values,
            drugs: pickedDrugList,
        });
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="add-treatment">
                    <div>
                        <div className="modal-header">
                            <div>{Date.now()}</div>
                            <button onClick={handleClose}>X</button>
                        </div>
                        <div className="modal-info-continer doc-pat flex column justify-center align-center">
                            <Formik
                                initialValues={{
                                    title: '',
                                    description: '',
                                    referrals: '',
                                }}
                                onSubmit={async (values) => {
                                    handleClose();
                                    updatePateient(values);
                                    values.title = '';
                                    values.description = '';
                                    values.referrals = '';
                                }}
                            >
                                <Form className="doc-pat-form">
                                    <div>
                                        <Field
                                            className="doc-pat-title"
                                            as={textFieldOutline}
                                            id="title"
                                            name="title"
                                            placeholder="Title.."
                                            type="text"
                                            label="Title"
                                            autoFocus
                                            required
                                        />

                                        <Field
                                            className="doc-pat-treatment description"
                                            as={'textarea'}
                                            id="description"
                                            name="description"
                                            placeholder="Description.."
                                            type="text"
                                            label="Description"
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="doc-pat-treatment drugs">
                                            <Autocomplete
                                                onChange={getValues}
                                                fullWidth
                                                multiple
                                                name="drugs"
                                                id="drugs"
                                                options={drugsList}
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Drugs"
                                                        placeholder="Choose Drugs.."
                                                    />
                                                )}
                                            />
                                        </div>

                                        <Field
                                            className="doc-pat-treatment med-title"
                                            as={textFieldOutline}
                                            id="referrals"
                                            name="referrals"
                                            placeholder="Enter Medical Referral"
                                            type="text"
                                            label="Medical Referral"
                                            autoFocus
                                        />

                                        <div className="spacer"></div>
                                        <Button
                                            className="sub-btn confirm"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
