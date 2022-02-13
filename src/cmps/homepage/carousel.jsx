import Carousel from 'react-elastic-carousel'
import { CarouselCard } from './carousel-card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function DocCarousel() {
    let carousel

  const doctors = [
    {
      _id: 'u101',
      fullname: 'Orly Amadi',
      imgUrl:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      _id: 'u2344',
      fullname: 'Anna Daninov',
      imgUrl:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      _id: 'u190',
      fullname: 'Ashley Gordon',
      imgUrl:
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80',
    },
    {
      _id: 'u103',
      fullname: 'David Davidov',
      imgUrl:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
    },
  ]
  const breakPoints = [
    {width:300,itemsToShow:1},
    {width:550,itemsToShow:2},
    {width:750,itemPadding:[10, 10]},
    {width:1000,itemPadding:[10,30]}
]
  return (
      <section className='carousel-card-container'>
          <h1>Our Doctors</h1>
          <Carousel breakPoints={breakPoints} itemPadding={[10,25]}  itemsToShow={3} pagination={false} showArrows={false} ref={ref => (carousel = ref)} >
            {doctors.map((doctor) => (
              <CarouselCard doctor={doctor} key={doctor._id}/>
            ))}
          </Carousel>
          <div className='carousel-arrows'>
          <button className='arrow-back' onClick={() => carousel.slidePrev()}><ArrowBackIcon/></button>
          <button className='arrow-forward' onClick={() => carousel.slideNext()}><ArrowForwardIcon/></button>
          </div>
      </section>
  )
}
