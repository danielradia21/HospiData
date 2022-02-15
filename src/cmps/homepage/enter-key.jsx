import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userService } from '../../services/user.service';


export function EnterKey({handleChangeModel}) {
    const textFieldOutline = (props) => (
        <TextField {...props} required margin="normal" fullWidth />
    );


    return ( 
        <div className='flex column hero-modal'>
                            <Formik
                                initialValues={{
                                    key: '',

                                }}
                                onSubmit={async (values) => {
                                    if( await userService.Chackey(values.key)){
                                        handleChangeModel('doctor')
                                    }
                                    values.key = '';
                                }}
                            >
                                <Form>
                                    <Field
                                       as={textFieldOutline}
                                       label="key"
                                       type="text"
                                       id="key"
                                       name="key"
                                       placeholder=" Enter a Key"
                                        autoFocus
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Send
                                    </Button>
                                </Form>
                            </Formik>
         </div>
    );
}
