import Carousel from 'react-elastic-carousel'
import { CarouselCard } from './carousel-card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function TeamCarousel() {
    let carousel

const teamMembers=[
    {
        fullname:'Beny Kursalin',
        imgUrl:'',
        prof:'Fullstack developer',
        linkedIn:'https://www.linkedin.com/in/benykursalin/',
        github:'https://github.com/Beku1',
        email:'beku1997@gmail.com'
    },
    {
        fullname:'Daniel Radia',
        imgUrl:'',
        prof:'Fullstack developer',
        linkedIn:'https://www.linkedin.com/in/itsdanielradia/',
        github:'https://github.com/danielradia21',
        email:'daniel@gmail.com'
    },
    {
        fullname:'Avishai Etach',
        imgUrl:'',
        prof:'Fullstack developer',
        linkedIn:'https://www.linkedin.com/in/avishaietach/',
        github:'https://github.com/avishaiEtach',
        email:'etach89@gmail.com'
    }
]


    const breakPoints = [
        {width:300,itemsToShow:1},
        {width:550,itemsToShow:2},
        {width:750,itemPadding:[10, 10]},
        {width:1000,itemPadding:[10,30]}
    ]

  return (
      <section className='carousel-card-container'>
          <h1>Our Team</h1>
          <Carousel breakPoints={breakPoints} itemPadding={[10, 30]} itemsToShow={3} pagination={false} showArrows={false} ref={ref => (carousel = ref)}>
            {teamMembers.map((member) => (
              <CarouselCard member={member} key={member.fullname}/>
            ))}
          </Carousel>
          <div className='carousel-arrows'>
          <button className='arrow-back' onClick={() => carousel.slidePrev()}><ArrowBackIcon/></button>
          <button className='arrow-forward' onClick={() => carousel.slideNext()}><ArrowForwardIcon/></button>
          </div>
      </section>
  )
}
