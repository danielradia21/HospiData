import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import PhoneIcon from '@mui/icons-material/Phone'

export function CarouselCard({ doctor }) {
  return (
    <Card sx={{ width: 240, height: 344 }} className="doctor-card carousel-card-preview">
      <div className="carousel-card-top">
        <div className="meta-background"></div>
        <CardMedia
          component="img"
          height="260"
          image={doctor.imgUrl}
          alt={doctor.fullname}
        />
        <div className="meta">
          <div className="phone-icon icon">
            <PhoneIcon />
          </div>
          <div className="whatsapp-icon icon">
            <WhatsAppIcon />
          </div>
        </div>
      </div>
      <CardContent>
        <Typography variant="h6" component="div" className="doctor-name">
          Dr. {doctor.fullname}
        </Typography>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          className="doctor-prof"
        >
          Doctor
        </Typography>
      </CardContent>
    </Card>

  )
}
