import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Button,
    Stack,
    Paper,
    CircularProgress,
    Snackbar,
    Alert,
    Link,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { GrAttachment } from 'react-icons/gr';
import santa from './assets/santa-claus_3723050.png';
import gift from './assets/gift.png';

const SecretSantaGame = () => {
    const [employeeFile, setEmployeeFile] = useState(null);
    const [previousComboFile, setPreviousComboFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleUploadChange = (setter) => (event) => {
        const file = event.target.files[0];

        if (file && !file.name.toLowerCase().endsWith('.csv')) {
            showSnackbar('Only .csv files are allowed.', 'error');
            return;
        }

        setter(file);
    };

    const handleDownload = async () => {
        if (!employeeFile || !previousComboFile) {
            showSnackbar(
                'Please upload both employee list and previous year Secret Santa CSV files.',
                'error'
            );
            return;
        }

        setLoading(true);
        setDownloadUrl('');

        const formData = new FormData();
        formData.append('current', employeeFile);
        formData.append('previous', previousComboFile);

        try {
            const response = await axios.post('http://localhost:5000/api/santa/upload', formData);
            const fileUrl = `http://localhost:5000${response.data.download}`;
            setDownloadUrl(fileUrl);
            showSnackbar('Success! File downloaded.', 'success');

            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', 'secret_santa_combination.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            showSnackbar('Upload failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #4a148c, #880e4f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{ borderRadius: 4, padding: 4 }}>
                    <Box
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        mb={3}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            marginBottom="10px"
                        >
                            <img
                                src={santa}
                                alt="santa emoji"
                                width={50}
                                height={50}
                                style={{ marginTop: '-5px' }}
                            />
                            <Typography
                                variant="h4"
                                color="primary"
                                fontWeight="bold"
                                gutterBottom
                                style={{ marginLeft: '20px', marginRight: '20px' }}
                            >
                                Secret Santa Game
                            </Typography>
                            <img
                                src={gift}
                                alt="gift emoji"
                                width={50}
                                height={50}
                                style={{ marginTop: '-5px' }}
                            />
                        </Box>
                        <Typography variant="body1" color="textSecondary">
                            Upload employee list and last year’s combo to generate this year’s magic!
                        </Typography>
                    </Box>

                    <Stack spacing={3}>
                        <Button
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            component="label"
                            fullWidth
                        >
                            Upload Current Employee List
                            <input
                                hidden
                                type="file"
                                accept=".csv"
                                onChange={handleUploadChange(setEmployeeFile)}
                            />
                        </Button>
                        {employeeFile && (
                            <Box display="flex" alignItems="center">
                                <GrAttachment size={16} style={{ marginRight: 8 }} />
                                <Typography variant="body2" color="textSecondary">
                                    {employeeFile.name}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            component="label"
                            fullWidth
                        >
                            Upload Previous Year Secret Santa Combo
                            <input
                                hidden
                                type="file"
                                accept=".csv"
                                onChange={handleUploadChange(setPreviousComboFile)}
                            />
                        </Button>
                        {previousComboFile && (
                            <Box display="flex" alignItems="center">
                                <GrAttachment size={16} style={{ marginRight: 8 }} />
                                <Typography variant="body2" color="textSecondary">
                                    {previousComboFile.name}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            startIcon={
                                loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    <DownloadIcon />
                                )
                            }
                            fullWidth
                            onClick={handleDownload}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#6a1b9a',
                                '&:hover': { backgroundColor: '#4a0072' },
                            }}
                        >
                            {loading ? 'Generating...' : 'Download New Combination'}
                        </Button>

                        {downloadUrl && (
                            <Link
                                href={downloadUrl}
                                download
                                underline="hover"
                                sx={{ mt: 1 }}
                            >
                                Click here to download again
                            </Link>
                        )}
                    </Stack>
                </Paper>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SecretSantaGame;
