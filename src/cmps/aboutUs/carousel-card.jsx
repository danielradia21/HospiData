import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';


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
                        image={member.imgUrl}
                        alt={member.fullname}
                    />
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
