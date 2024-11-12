import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../templates/shared-theme/AppTheme';
import { SitemarkIcon } from '../sign-in/CustomIcons';
import { AUTH_ROUTES } from '@/constants/endpoint';
import { apiClient } from '@/utils';
import { setUser } from '@/redux/reducers/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [keyError, setKeyError] = React.useState(false);
  const [keyErrorMessage, setKeyErrorMessage] = React.useState('');
  const [secretError, setSecretError] = React.useState(false);
  const [secretErrorMessage, setSecretErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [inputVisibility, setInputVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const key = document.getElementById('key') as HTMLInputElement;
    const secret = document.getElementById('secret') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    if (!key.value || key.value.length < 6) {
      setKeyError(true);
      setKeyErrorMessage('Key must be at least 6 characters long.');
      isValid = false;
    } else {
      setKeyError(false);
      setKeyErrorMessage('');
    }
    if (!secret.value || secret.value.length < 6) {
      setSecretError(true);
      setSecretErrorMessage('Secret must be at least 6 characters long.');
      isValid = false;
    } else {
      setSecretError(false);
      setSecretErrorMessage('');
    }
    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameError || emailError || keyError || secretError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    let userData = {
      name: data.get('name'),
      key: data.get('key'),
      email: data.get('email'),
      secret: data.get('secret'),
    };
    setLoading(true);
    try {
      const response = await apiClient.post('/signup', userData);
      dispatch(setUser(response.data.data))
      navigate("/")
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={keyError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="key">Key</FormLabel>
              <TextField
                error={secretError}
                helperText={secretErrorMessage}
                id="key"
                type={inputVisibility ? "text" : "password"}
                name="key"
                placeholder={inputVisibility ? "Key" : "••••••"}
                autoComplete="key"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={secretError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="secret">Secret</FormLabel>
              <TextField
                error={keyError}
                helperText={keyErrorMessage}
                name="secret"
                placeholder={inputVisibility ? "Secret" : "••••••"}
                type={inputVisibility ? "text" : "password"}
                id="secret"
                autoComplete="secret"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={keyError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={inputVisibility} onChange={() => setInputVisibility((prev) => !prev)} color="primary" />}
              label="Inputs visibility"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              disabled={loading}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href={AUTH_ROUTES.LOGIN}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
