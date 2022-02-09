import hero from '../../assets/img/hero.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SignUp } from '../signup';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userService } from '../../services/user.service';


export function EnterKey({handleChangeModel}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                    // alert(JSON.stringify(values,null,2))
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
