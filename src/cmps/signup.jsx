import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Field, Form } from 'formik';
import { userService } from '../services/user.service';
import { SignIn } from './login';

const theme = createTheme();

export function SignUp({ onClose ,userSatus }) {
    const [toggleForm, setToggleForm] = React.useState(false);
    const switchForm = () => {
        setToggleForm((prevVal) => (prevVal = !prevVal));
    };
    const textFieldOutline = (props) => (
        <TextField {...props} required margin="normal" fullWidth />
    );

    return (
        <div >
            {toggleForm ? (
                <SignIn onClose={onClose} />
            ) : (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                // marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up {userSatus}
                            </Typography>
                            <Formik
                                initialValues={{
                                    fullname: '',
                                    username: '',
                                    password: '',
                                    UID:''
                                }}
                                onSubmit={async (values) => {
                                    onClose();
                                    let userCred = {
                                        ...values,
                                        imgUrl:"https://www.iconspng.com/images/young-user-icon.jpg",
                                        isAdmin: false,
                                        type: userSatus,
                                    }
                                    if(userSatus === 'patient'){
                                        userCred = {...userCred ,appointments: [],inbox:[] }
                                    }else if(userSatus === 'doctor'){
                                        userCred = {...userCred ,meetings: [],patients:[] }
                                    }
                                    await userService.signup (userCred);
                                    values.fullname = '';
                                    values.username = '';
                                    values.password = '';
                                    values.UID = '';
                                }}
                            >
                                <Form>
                                    <Field
                                       as={textFieldOutline}
                                       label="UID"
                                       type="text"
                                       id="UID"
                                       name="UID"
                                       placeholder="UID"
                                        autoFocus
                                    />
                                    <Field
                                        as={textFieldOutline}
                                        label="Full Name"
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Jane"
                                    />

                                    <Field
                                        as={textFieldOutline}
                                        label="Email"
                                        id="username"
                                        name="username"
                                        placeholder="jane@acme.com"
                                        type="email"
                                    />

                                    <Field
                                        as={textFieldOutline}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Doe"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link
                                                onClick={switchForm}
                                                variant="body2"
                                            >
                                                Already have an account? Sign in
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

/* <Box
    component="form"
    noValidate
onSubmit={handleSubmit}
sx={{ mt: 3 }}
>
<Grid container spacing={2}>
    <Grid item xs={12}>
        <TextField
            autoComplete="given-name"
            name="fullname"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            autoFocus
        />
    </Grid>
    <Grid item xs={12}>
        <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
        />
    </Grid>
    <Grid item xs={12}>
        <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
        />
    </Grid>
    <Grid item xs={12}>
        <FormControlLabel
            control={
                <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                />
            }
            label="I want to receive inspiration, marketing promotions and updates via email."
        />
    </Grid>
</Grid>
<Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
>
    Sign Up
</Button>
<Grid container justifyContent="flex-end">
    <Grid item>
        <Link href="#" variant="body2">
            Already have an account? Sign in
        </Link>
    </Grid>
</Grid>
</Box> */
