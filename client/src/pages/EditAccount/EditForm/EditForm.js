import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputDate from '../InputDate/InputDate';
import InputSelect from '../InputSelect';
import { Button } from '@mui/material';

export default function EditForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState(dayjs('2022-04-17'));
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [userExists, setUserExists] = useState(true);
    const [editResponse, setEditResponse] = useState('');

    const handleChangeDayOfBirth = (date) => {
        setDayOfBirth(date);
    };

    const handleChangeGender = (gender) => {
        setGender(gender);
    };

    useEffect(() => {
        axios
            .get('/edit-profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')} `,
                },
            })
            .then((response) => {
                if (response.data.message === 'User not found') {
                    setUserExists(false);
                }

                if (response.data.message === 'User found') {
                    const userData = response.data.userData;
                    console.log(userData);

                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setDayOfBirth(userData.dob);
                    setGender(userData.gender);
                    setEmail(userData.email);
                    setAddress(userData.address);
                    setUserExists(true);
                }
            });
    }, []);

    if (!userExists) {
        return <Navigate to="*" />;
    }

    const handleSubmitProfileEdition = () => {
        const userData = {
            firstName,
            lastName,
            dayOfBirth,
            gender,
            email,
            address,
        };

        axios
            .post(
                '/edit-profile',
                { userData },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((response) => {
                if (response.data.message === 'Update successfully') {
                    setEditResponse(response.data.message);
                } else {
                    setEditResponse('Fail to update your profile. Please try again later!');
                }
            });
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        label="First name"
                        variant="filled"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        label="Last name"
                        defaultValue="Anh"
                        variant="filled"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputDate dayOfBirth={dayOfBirth} changeDate={handleChangeDayOfBirth} />
                </Grid>
                <Grid item xs={12} sm={6} mt={1}>
                    <InputSelect gender={gender} changeGender={handleChangeGender} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        defaultValue="Your email"
                        variant="filled"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        label="Address"
                        variant="filled"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" style={{ background: '#d32f2f' }} fullWidth>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" fullWidth onClick={handleSubmitProfileEdition}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
