import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function CarouselCard({ member, handleOpen, getMember }) {
    const openModel = () => {
        handleOpen();
        getMember(member);
    };

    return (
        <>
            <Card
                sx={{ width: 240, height: 344 }}
                className="carousel-card-preview member-card"
            >
                <div className="carousel-card-top">
                    <div className="meta-background"></div>
                    <CardMedia
                        component="img"
                        height="260"
                        image="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
                        alt={member.fullname}
                    />
                    {/* <CardMedia   component="img"   height="260"    image={member.imgUrl} alt={member.fullname} /> */}
                    <div className="meta">
                        <div className="linkedin-icon icon">
                            <a
                                href={member.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon />
                            </a>
                        </div>
                        <div className="github-icon icon">
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitHubIcon />
                            </a>
                        </div>
                        <div className="email-icon icon">
                            <div onClick={openModel}>
                                {' '}
                                <EmailIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        className="doctor-name"
                    >
                        {member.fullname}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="p"
                        component="div"
                        className="doctor-prof"
                    >
                        {member.prof}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
