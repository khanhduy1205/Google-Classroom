import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import {useTranslation} from 'react-i18next';

const cx = classNames.bind(styles);

export default function BasicList() {
    const { t } = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLink to='/home' className={cx('btn')}>
                        {isActive => (
                            <ListItem disablePadding style={{background: isActive? '#e3eefc' : 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={t('home')}/>
                            </ListItemButton>
                        </ListItem>
                        )}
                    </NavLink>

                    <NavLink to='/calendar' className={cx('btn')}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CalendarMonthIcon />
                                </ListItemIcon>
                                <ListItemText primary={t('calendar')} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>

            <Divider />

            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('teaching')} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>

            <Divider />

            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('enrolled')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddTaskIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('to do')} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>

            <Divider />

            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ArchiveIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('archived classes')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('settings')}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}
