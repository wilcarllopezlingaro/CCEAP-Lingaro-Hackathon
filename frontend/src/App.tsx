import { Box, Container, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import HealthIndicator from './components/HealthIndicator';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 2
        }}
      >
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            App Starting Template
          </Typography>
          <HealthIndicator />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
