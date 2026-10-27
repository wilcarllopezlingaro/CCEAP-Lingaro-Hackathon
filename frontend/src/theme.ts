import { createTheme } from '@mui/material/styles';

// Colors according to UI documentation
const colors = {
    primary: '#662E90',
    primaryHover: '#522470',
    primaryPressed: '#3E1B55',
    primaryLight: '#EBDCF4',
    black: '#000000',
    white: '#FFFFFF',
    background: '#FFFFFF',
    backgroundSecondary: '#F6F7F9',
    divider: '#E1E2E4',
    textSecondary: '#757779',
    success: '#38B13C',
    successLight: '#E9F7EA',
    successDark: '#054B07',
    error: '#E2302D',
    errorLight: '#FDECEA',
    errorDark: '#8A0C0C',
    warning: '#FABD29',
    warningLight: '#FFF9E0',
    warningDark: '#6C4E00',
    info: '#662E90',
    infoLight: '#EBDCF4',
    infoDark: '#3E1B55',
    // Additional status colors
    draft: '#FAB15E',
    draftLight: '#FFF4E5',
    draftDark: '#862800',
    // Shadow colors
    shadowDark: '#333333',
};

// Typography according to documentation (Maven Pro for headings and buttons, Manrope for body text)
export const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
            light: colors.primaryLight,
            dark: colors.primaryPressed,
            contrastText: colors.white,
        },
        secondary: {
            main: colors.black,
            light: colors.textSecondary,
            contrastText: colors.white,
        },
        background: {
            default: colors.background,
            paper: colors.background,
        },
        divider: colors.divider,
        text: {
            primary: colors.black,
            secondary: colors.textSecondary,
        },
        success: {
            main: colors.success,
            light: colors.successLight,
            dark: colors.successDark,
        },
        error: {
            main: colors.error,
            light: colors.errorLight,
            dark: colors.errorDark,
        },
        warning: {
            main: colors.warning,
            light: colors.warningLight,
            dark: colors.warningDark,
        },
        info: {
            main: colors.info,
            light: colors.infoLight,
            dark: colors.infoDark,
        },
    },
    typography: {
        fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
        // Maven Pro for headings and buttons
        h1: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h3: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h4: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.125rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h5: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h6: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        // Manrope for body text
        body1: {
            fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.875rem', // 14px
            fontWeight: 400,
        },
        body2: {
            fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.75rem', // 12px
            fontWeight: 400,
        },
        // Button text - Maven Pro
        button: {
            fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.875rem', // 14px
            fontWeight: 500,
            textTransform: 'none',
        },
        // Caption for helper text
        caption: {
            fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.75rem', // 12px
            fontWeight: 500,
        },
    },
    components: {
        // Top App Bar configuration
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background,
                    color: colors.black,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    height: '64px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    '&.MuiAppBar-positionFixed': {
                        borderBottom: `1px solid ${colors.divider}`,
                    },
                },
            },
        },
        // Container configuration (max width 960px, 24px padding)
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '960px !important',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                },
            },
        },
        // Button configuration - all variants according to documentation
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    textTransform: 'none',
                    minHeight: '44px',
                    minWidth: '88px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
                    '&:focus': {
                        outline: `2px solid ${colors.divider}`,
                        outlineOffset: '2px',
                    },
                },
                // Primary button (filled)
                contained: {
                    backgroundColor: colors.primary,
                    color: colors.white,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colors.primaryHover,
                        boxShadow: 'none',
                    },
                    '&:active': {
                        backgroundColor: colors.primaryPressed,
                        boxShadow: 'none',
                    },
                    '&:disabled': {
                        backgroundColor: colors.backgroundSecondary,
                        color: `${colors.black}66`, // 40% opacity
                    },
                },
                // Secondary button (outlined)
                outlined: {
                    backgroundColor: colors.white,
                    color: colors.black,
                    border: `1px solid ${colors.divider}`,
                    '&:hover': {
                        backgroundColor: colors.backgroundSecondary,
                        borderColor: colors.textSecondary,
                    },
                    '&:active': {
                        backgroundColor: colors.divider,
                        borderColor: colors.textSecondary,
                    },
                    '&:disabled': {
                        backgroundColor: colors.backgroundSecondary,
                        borderColor: colors.divider,
                        color: `${colors.black}66`, // 40% opacity
                    },
                },
                // Tertiary button (text)
                text: {
                    backgroundColor: 'transparent',
                    color: colors.primary,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: colors.primaryHover,
                        textDecoration: 'underline',
                    },
                    '&:active': {
                        backgroundColor: 'transparent',
                        color: colors.primaryPressed,
                    },
                    '&:disabled': {
                        backgroundColor: 'transparent',
                        color: `${colors.black}66`, // 40% opacity
                    },
                },
            },
        },
        // Tabs configuration
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background,
                    minHeight: '48px',
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors.primary,
                        height: '2px',
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    minHeight: '48px',
                    minWidth: '44px',
                    padding: '12px 16px',
                    color: colors.textSecondary,
                    '&:hover': {
                        color: colors.black,
                        '& .MuiTabs-indicator': {
                            backgroundColor: `${colors.primary}99`, // 60% opacity
                        },
                    },
                    '&:focus': {
                        outline: `2px solid ${colors.divider}`,
                        outlineOffset: '2px',
                    },
                    '&.Mui-selected': {
                        color: colors.primary,
                    },
                    '&.Mui-disabled': {
                        color: `${colors.black}66`, // 40% opacity
                    },
                },
            },
        },
        // Text Field configuration
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: colors.black,
                        marginBottom: '4px',
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        minHeight: '44px',
                        fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.875rem',
                        '& fieldset': {
                            borderColor: colors.divider,
                        },
                        '&:hover fieldset': {
                            borderColor: colors.textSecondary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary,
                            borderWidth: '2px',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: colors.backgroundSecondary,
                            '& fieldset': {
                                borderColor: colors.divider,
                            },
                        },
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: colors.textSecondary,
                        opacity: 1,
                    },
                    '& .MuiFormHelperText-root': {
                        fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.75rem',
                        marginTop: '4px',
                    },
                },
            },
        },
        // Chip configuration
        MuiChip: {
            styleOverrides: {
                root: {
                    height: '24px',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                    padding: '0 8px',
                },
                // Success chip
                colorSuccess: {
                    backgroundColor: colors.successLight,
                    color: colors.successDark,
                    border: `1px solid ${colors.success}`,
                    '&:hover': {
                        backgroundColor: '#e0f5e1', // slightly darker
                    },
                },
                // Error chip
                colorError: {
                    backgroundColor: colors.errorLight,
                    color: colors.errorDark,
                    border: `1px solid ${colors.error}`,
                    '&:hover': {
                        backgroundColor: '#fce7e4', // slightly darker
                    },
                },
                // Warning chip
                colorWarning: {
                    backgroundColor: colors.warningLight,
                    color: colors.warningDark,
                    border: `1px solid ${colors.warning}`,
                    '&:hover': {
                        backgroundColor: '#fff6d6', // slightly darker
                    },
                },
                // Info chip
                colorInfo: {
                    backgroundColor: colors.infoLight,
                    color: colors.infoDark,
                    border: `1px solid ${colors.info}`,
                    '&:hover': {
                        backgroundColor: '#e8d9f2', // slightly darker
                    },
                },
                // Primary chip (filter active)
                colorPrimary: {
                    backgroundColor: colors.primaryLight,
                    color: colors.primaryPressed,
                    border: `1px solid ${colors.primary}`,
                    '&:hover': {
                        backgroundColor: '#e8d9f2', // slightly darker
                    },
                },
            },
        },
        // Card configuration
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    borderRadius: '16px',
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Level 1 shadow
                    padding: '16px',
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Level 2 shadow
                        cursor: 'pointer',
                    },
                    '&:focus': {
                        outline: `2px solid ${colors.primary}`,
                        outlineOffset: '2px',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: colors.backgroundSecondary,
                        color: `${colors.black}66`, // 40% opacity
                    },
                },
            },
        },
        // CardContent configuration
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '0',
                    '&:last-child': {
                        paddingBottom: '0',
                    },
                },
            },
        },
        // Table configuration
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    width: '100%',
                    maxWidth: '960px',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.backgroundSecondary,
                    '& .MuiTableCell-head': {
                        fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: colors.black,
                        borderBottom: `1px solid ${colors.divider}`,
                    },
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root': {
                        '&:hover': {
                            backgroundColor: colors.backgroundSecondary,
                        },
                        '&.Mui-selected': {
                            backgroundColor: colors.primaryLight,
                        },
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: colors.black,
                    minHeight: '44px',
                    padding: '12px 16px',
                    borderBottom: `1px solid ${colors.divider}`,
                },
            },
        },
        // Dialog configuration
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.white,
                    borderRadius: '16px',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)', // Level 5 shadow
                    maxWidth: '840px',
                    width: '720px',
                    padding: '24px',
                    '&:focus': {
                        outline: `2px solid ${colors.primary}`,
                        outlineOffset: '2px',
                    },
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontFamily: '"Maven Pro", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: colors.black,
                    padding: '0 0 16px 0',
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.875rem',
                    color: colors.black,
                    padding: '0',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '24px 0 0 0',
                    justifyContent: 'flex-end',
                    gap: '16px',
                },
            },
        },
        // Stepper configuration
        MuiStepper: {
            styleOverrides: {
                root: {
                    padding: '24px 0',
                },
            },
        },
        MuiStep: {
            styleOverrides: {
                root: {
                    padding: '0 32px',
                },
            },
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    width: '24px',
                    height: '24px',
                    color: colors.divider,
                    '&.Mui-active': {
                        color: colors.primary,
                    },
                    '&.Mui-completed': {
                        color: colors.primary,
                        backgroundColor: colors.primaryLight,
                    },
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: colors.textSecondary,
                    marginTop: '8px',
                    '&.Mui-active': {
                        color: colors.black,
                        fontWeight: 500,
                    },
                    '&.Mui-completed': {
                        color: colors.textSecondary,
                    },
                },
            },
        },
        // Alert configuration (for callouts/banners)
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    border: '1px solid',
                },
                standardSuccess: {
                    backgroundColor: colors.successLight,
                    color: colors.successDark,
                    borderColor: colors.success,
                    '& .MuiAlert-icon': {
                        color: colors.success,
                    },
                },
                standardError: {
                    backgroundColor: colors.errorLight,
                    color: colors.errorDark,
                    borderColor: colors.error,
                    '& .MuiAlert-icon': {
                        color: colors.error,
                    },
                },
                standardWarning: {
                    backgroundColor: colors.warningLight,
                    color: colors.warningDark,
                    borderColor: colors.warning,
                    '& .MuiAlert-icon': {
                        color: colors.warning,
                    },
                },
                standardInfo: {
                    backgroundColor: colors.infoLight,
                    color: colors.infoDark,
                    borderColor: colors.info,
                    '& .MuiAlert-icon': {
                        color: colors.info,
                    },
                },
            },
        },
        // Divider configuration
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: colors.divider,
                    margin: '16px 0',
                },
            },
        },
        // Tooltip configuration
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: colors.shadowDark,
                    color: colors.white,
                    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    borderRadius: '8px',
                    padding: '8px',
                    maxWidth: '240px',
                },
                arrow: {
                    color: colors.shadowDark,
                },
            },
        },
        // Snackbar configuration (for popup messages/toasts)
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    '& .MuiSnackbarContent-root': {
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        minWidth: '240px',
                    },
                },
            },
        },
    },
    spacing: 8, // Base spacing unit - 8px
});