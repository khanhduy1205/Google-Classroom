import * as React from 'react';
import { Navigate } from 'react-router';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import EditForm from './EditForm/EditForm';
import DefaultLayout from 'layouts/DefaultLayout';
import {useTranslation} from 'react-i18next';

export default function EditAccount() {
    const { t } = useTranslation();
    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

    return (
        <DefaultLayout>
            <React.Fragment>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center" mb={2}>
                            {t('edit account')}
                        </Typography>

                        <EditForm />
                    </Paper>
                </Container>
            </React.Fragment>
        </DefaultLayout>
    );
}
