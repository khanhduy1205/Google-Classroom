import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { extractFileName, extractFileNameExtension } from 'utils/filename';

import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { GoogleDriveImage } from 'assets/images';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FileName = ({ filename, maxLength }) => {
    // Kiểm tra độ dài của tên file
    if (filename.length > maxLength) {
        // Cắt tên file và thêm "..."
        const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
        return <span>{truncatedFilename}</span>;
    }
    return <span>{filename}</span>;
};

function Assignment({ data, classDetail }) {
    const [click, setClick] = useState(false);
    const [assignment, setAssignment] = useState(data);

    const handleAccordionClick = () => {
        setClick(!click);
    };

    const getDateUpload = () => {
        const date = new Date(assignment.date);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

    const studentView = () => {
        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ height: 70 }}
                    >
                        <List>
                            <ListItem>
                                <ListItem>
                                    <ListItem>
                                        <Avatar>
                                            <AssignmentIcon />
                                        </Avatar>
                                    </ListItem>

                                    <Typography sx={{ width: '80%', alignSelf: 'center' }}>
                                        {assignment.title}
                                    </Typography>
                                </ListItem>
                            </ListItem>
                        </List>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Đã đăng vào {getDateUpload()}</Typography>

                        {assignment.file_urls[0] && (
                            <Card sx={{ display: 'flex', width: '50%', margin: '20px' }}>
                                <CardActionArea
                                    component={Link}
                                    to={assignment.file_urls[0]}
                                    target="_blank"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        height: '90px',
                                    }}
                                >
                                    {extractFileNameExtension(assignment.file_urls[0]) === 'Image' ? (
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 150, height: '100%' }}
                                            image={assignment.file_urls[0]}
                                            alt="Image"
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 150, height: '100%' }}
                                            image={GoogleDriveImage}
                                            alt="Google Drive"
                                        />
                                    )}
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                                <FileName
                                                    filename={extractFileName(assignment.file_urls[0])}
                                                    maxLength={25}
                                                />
                                            </Typography>
                                            <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                                {extractFileNameExtension(assignment.file_urls[0])}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        )}
                        <Divider sx={{ margin: '10px 0' }} />
                        <Link to={`/class/${classDetail.class_id}/student/classwork/${data.id}/instruction`}>
                            <Button variant="text">Xem chi tiết</Button>
                        </Link>
                    </AccordionDetails>
                </Accordion>
            </>
        );
    };

    const teacherView = () => {
        return (
            <>
                <Accordion onClick={handleAccordionClick} sx={{ boxShadow: click ? '-moz-initial' : 'none' }}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ ':hover': { background: '#e8f0fe' }, display: 'flex', alignItems: 'center' }}
                    >
                        <Typography
                            sx={{
                                background: '#4285f4',
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 2,
                            }}
                        >
                            <AssignmentIcon sx={{ color: 'white' }} />
                        </Typography>
                        <Typography sx={{ width: '80%', alignSelf: 'center' }}>{assignment.title}</Typography>
                        <Typography sx={{ width: '20%', color: '#0000008C', alignSelf: 'center', fontSize: '12px' }}>
                            Đã đăng vào {getDateUpload()}
                        </Typography>
                        <Typography sx={{ alignSelf: 'center' }}>{<MoreVertIcon />}</Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                        <Typography sx={{ padding: '16px 24px' }}>
                            <div style={{ fontSize: '12px', color: '#5f6368' }}>Đã đăng vào {getDateUpload()}</div>
                            <div style={{ textAlign: 'right' }}>
                                <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                                    <li
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            padding: '0px 16px',
                                            borderLeft: '1px solid #b5bec9',
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>0</span>
                                        <span>Đã nộp</span>
                                    </li>
                                    <li
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            padding: '0px 16px',
                                            borderLeft: '1px solid #b5bec9',
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>0</span>
                                        <span>Đã giao</span>
                                    </li>
                                    <li
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            paddingLeft: '16px',
                                            borderLeft: '1px solid #b5bec9',
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>0</span>
                                        <span>Đã chấm điểm</span>
                                    </li>
                                </ul>
                            </div>

                            {assignment.file_urls[0] && (
                                <Card sx={{ width: '400px', height: '90px' }}>
                                    <CardActionArea
                                        component={Link}
                                        to={assignment.file_urls[0]}
                                        target="_blank"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            width: '400px',
                                            height: '90px',
                                        }}
                                    >
                                        {extractFileNameExtension(assignment.file_urls[0]) === 'Image' ? (
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 150, height: '100%' }}
                                                image={assignment.file_urls[0]}
                                                alt="Image"
                                            />
                                        ) : (
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 150, height: '100%' }}
                                                image={GoogleDriveImage}
                                                alt="Google Drive"
                                            />
                                        )}
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                                    <FileName
                                                        filename={extractFileName(assignment.file_urls[0])}
                                                        maxLength={25}
                                                    />
                                                </Typography>
                                                <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                                    {extractFileNameExtension(assignment.file_urls[0])}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            )}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                        <Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                                <Link to={`/class/${classDetail.class_id}/teacher/classwork/${data.id}/instruction`}>
                                    <Button variant="text" sx={{ color: '#518cdd' }}>
                                        Xem hướng dẫn
                                    </Button>
                                </Link>

                                <Button variant="contained" sx={{ padding: '8px 24px' }}>
                                    Đánh giá bài tập
                                </Button>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        );
    };

    return <>{classDetail.role === 'teacher' ? teacherView() : studentView()}</>;
}

export default memo(Assignment);
// export default Assignment;
