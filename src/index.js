import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a custom theme for Material UI components with gradients
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5CF6',
      dark: '#6E59A5',
      light: '#E5DEFF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D946EF',
      dark: '#BA34D5',
      light: '#FFDEE2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F97316',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1F2C',
      secondary: '#8E9196',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      background: 'linear-gradient(135deg, #8B5CF6, #D946EF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    body1: {
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f5f7fa, #e1e6ed)',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8B5CF6, #D946EF)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c4ef3, #c038db)',
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
          },
        },
        outlinedPrimary: {
          borderColor: '#8B5CF6',
          color: '#8B5CF6',
          '&:hover': {
            borderColor: '#D946EF',
            background: 'rgba(139, 92, 246, 0.04)',
            transform: 'translateY(-3px)',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.1)',
          },
        },
      },
    },
    
    // Enhanced TextField styling for forms
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B5CF6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B5CF6',
              borderWidth: '2px',
              boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#6E59A5',
            '&.Mui-focused': {
              color: '#8B5CF6',
            },
          },
          '& .MuiFilledInput-root': {
            background: 'rgba(139, 92, 246, 0.04)',
            '&:hover': {
              background: 'rgba(139, 92, 246, 0.08)',
            },
            '&.Mui-focused': {
              background: 'rgba(139, 92, 246, 0.06)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(217, 70, 239, 0.05))',
          borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        },
        title: {
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          fontWeight: 500,
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, #8B5CF6, #6E59A5)',
        },
        colorSecondary: {
          background: 'linear-gradient(90deg, #D946EF, #BA34D5)',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';

// // Create a custom theme for Material UI components with gradients
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8B5CF6',
//       dark: '#6E59A5',
//       light: '#E5DEFF',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#D946EF',
//       dark: '#BA34D5',
//       light: '#FFDEE2',
//       contrastText: '#ffffff',
//     },
//     error: {
//       main: '#EF4444',
//     },
//     warning: {
//       main: '#F97316',
//     },
//     success: {
//       main: '#10B981',
//     },
//     background: {
//       default: '#f5f7fa',
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#1A1F2C',
//       secondary: '#8E9196',
//     },
//   },
//   typography: {
//     fontFamily: "'Inter', sans-serif",
//     h1: {
//       fontWeight: 800,
//       fontSize: '2.5rem',
//       background: 'linear-gradient(135deg, #8B5CF6, #D946EF)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//     h2: {
//       fontWeight: 700,
//       fontSize: '2rem',
//     },
//     h3: {
//       fontWeight: 600,
//       fontSize: '1.5rem',
//     },
//     button: {
//       fontWeight: 600,
//       textTransform: 'none',
//     },
//     body1: {
//       lineHeight: 1.7,
//     },
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           background: 'linear-gradient(135deg, #f5f7fa, #e1e6ed)',
//           minHeight: '100vh',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           boxShadow: 'none',
//           textTransform: 'none',
//           fontWeight: 600,
//           padding: '10px 20px',
//           borderRadius: '8px',
//           transition: 'all 0.3s ease',
//           position: 'relative',
//           overflow: 'hidden',
//         },
//         containedPrimary: {
//           background: 'linear-gradient(135deg, #8B5CF6, #D946EF)',
//           '&:hover': {
//             background: 'linear-gradient(135deg, #7c4ef3, #c038db)',
//             transform: 'translateY(-3px)',
//             boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
//           },
//         },
//         outlinedPrimary: {
//           borderColor: '#8B5CF6',
//           color: '#8B5CF6',
//           '&:hover': {
//             borderColor: '#D946EF',
//             background: 'rgba(139, 92, 246, 0.04)',
//             transform: 'translateY(-3px)',
//             boxShadow: '0 4px 15px rgba(139, 92, 246, 0.1)',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           marginBottom: '20px',
//           '& .MuiOutlinedInput-root': {
//             '&:hover .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#8B5CF6',
//             },
//             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#8B5CF6',
//               borderWidth: '2px',
//               boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.1)',
//             },
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: '16px',
//           boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
//           overflow: 'hidden',
//           transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//           '&:hover': {
//             transform: 'translateY(-5px)',
//             boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
//           },
//         },
//       },
//     },
//     MuiCardHeader: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(217, 70, 239, 0.05))',
//           borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
//         },
//         title: {
//           fontWeight: 600,
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: '30px',
//           fontWeight: 500,
//         },
//         colorPrimary: {
//           background: 'linear-gradient(135deg, #8B5CF6, #6E59A5)',
//         },
//         colorSecondary: {
//           background: 'linear-gradient(90deg, #D946EF, #BA34D5)',
//         },
//       },
//     },
//   },
// });

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

