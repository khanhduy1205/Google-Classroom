import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function Material({ classDetail }) {
    const [click, setClick] = useState(false);

    const handleAccordionClick = () => {
        setClick(!click);
    };

    const FileName = ({filename, maxLength}) => {
        // Kiểm tra độ dài của tên file
        if (filename.length > maxLength) {
          // Cắt tên file và thêm "..."
          const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
          return <span>{truncatedFilename}</span>;
        }
        return <span>{filename}</span>;
    }

    return (
        <Accordion
            onClick={handleAccordionClick}
            sx={{ boxShadow: click ? '-moz-initial' : 'none' }}
        >
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
                    {<AssignmentIcon sx={{ color: 'white' }} />}
                </Typography>
                <Typography sx={{ width: '80%', alignSelf: 'center' }}>Tài liệu Cuối kỳ</Typography>
                <Typography sx={{ width: '20%', color: '#0000008C', alignSelf: 'center', fontSize: '12px' }}>
                    Đã đăng vào 27/12/2023
                </Typography>
                <Typography sx={{ alignSelf: 'center' }}>{<MoreVertIcon />}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                <Typography sx={{ padding: '16px 24px' }}>
                    <Card sx={{ display: 'flex', width: '400px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="https://png.pngtree.com/thumb_back/fw800/background/20210920/pngtree-school-classroom-blackboard-desk-education-course-training-class-classroom-background-image_904108.png"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                    <FileName filename='Hướng dẫn Bài tập 1.docx' maxLength={25} />
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                    Word
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Typography>
            </AccordionDetails>
            <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                <Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                        <Link to={`/class/${classDetail.class_id}/material`}>
                            <Button variant="text" sx={{ color: '#518cdd' }}>
                                Xem tài liệu
                            </Button>
                        </Link>
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

