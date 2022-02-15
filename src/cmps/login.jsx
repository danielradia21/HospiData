import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Field, Form } from 'formik';
import { SignUp } from './signup';
import { onLogin } from '../store/actions/user.actions';
import { useDispatch } from 'react-redux';
import { EnterKey } from './homepage/enter-key';
import { BtnModal } from './homepage/btn-modal';

const theme = createTheme();

export function SignIn({ onClose }) {
    const dispatch = useDispatch();
    const [toggleForm, setToggleForm] = React.useState(false);
    const switchForm = () => {
        setToggleForm((prevVal) => (prevVal = !prevVal));
    };
    const [modals,setmodals] = React.useState('');

    const handleChangeModel = (stus) =>  setmodals(stus)

    const textFieldOutline = (props) => (
        <TextField {...props} margin="normal" required fullWidth />
    );

    return (
        <div>
            {toggleForm ? (
                modals === 'patient' ? <SignUp onClose={onClose} userSatus={modals} /> 
                : modals === 'enterKey' ? <EnterKey onClose={onClose} handleChangeModel={handleChangeModel} userSatus={modals}/>
                : modals === 'doctor' ?<SignUp onClose={onClose} userSatus={modals}/>
                :<BtnModal handleChangeModel={handleChangeModel}/>
                 
            ) : (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                onSubmit={async (values) => {
                                    onClose();
                                    await dispatch(onLogin(values));
                                    values.username = '';
                                    values.password = '';
                                }}
                            >
                                <Form>
                                    <Field
                                        as={textFieldOutline}
                                        id="username"
                                        name="username"
                                        placeholder="jane@acme.com"
                                        type="email"
                                        label="Email Address"
                                        autoFocus
                                    />

                                    <Field
                                        as={textFieldOutline}
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Password"
                                    />
                                    <div className="spacer"></div>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>

                                        <Grid item>
                                            <Link
                                                onClick={switchForm}
                                                variant="body2"
                                            >
                                                {
                                                    "Don't have an account? Sign Up"
                                                }
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            </Formik>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </div>
    );
}
