import { CardPrev } from './card-prev';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export function CardList() {
    const contents = [
        {
            text: 'Chat with a doctors',
            icon: <SupervisedUserCircleIcon />,
            color: '#4E5AFE',
        },
        {
            text: 'One-Health Protection',
            icon: <GppGoodIcon />,
            color: '#00D9A5',
        },
        {
            text: 'One-Health Pharmacy',
            icon: <MedicalServicesIcon />,
            color: '#FF3D85',
        },
    ];
    return (
        <div className="main-card-container">
            <div className="cards-container">
                {contents.map((content, idx) => (
                    <CardPrev
                        key={idx}
                        text={content.text}
                        icon={content.icon}
                        color={content.color}
                    />
                ))}
            </div>
        </div>
    );
}
