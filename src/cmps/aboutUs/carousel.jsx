import Carousel from 'react-elastic-carousel'
import { CarouselCard } from './carousel-card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Formik, Field, Form } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'

export function TeamCarousel() {
    let carousel
    const [open, setOpen] = useState(false);
    const [member, setMember] = useState({});
    const [success, setSuccess] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
      }
      
      const handleClose = () => {
        setOpen(false);
        setSuccess(false);
      }
    
      const handleSuccess = () => 
      {
        setSuccess(true);
        setTimeout(handleClose,3200)
      }

      const getMember = (member) =>{
        setMember(prev => prev = member)
      }

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: success ? 0 :  3,
      };
     
      const textFieldOutline = (props) => (
        <TextField {...props} margin="normal" required fullWidth />
    );


const teamMembers=[
    {
        fullname:'Beny Kursalin',
        imgUrl:'',
        prof:'Fullstack developer',
        linkedIn:'https://www.linkedin.com/in/benykursalin/',
        github:'https://github.com/Beku1',
        email:'beku1997@gmail.com',
        service:'service_7g7fn1e',
        template:'template_1mzk172',
        userId: 'user_qiBVKJIeL6JHJFMRNHQOw',

    },
    {
        fullname:'Daniel Radia',
        imgUrl:'',
        prof:'Fullstack developer',
        linkedIn:'https://www.linkedin.com/in/itsdanielradia/',
        github:'https://github.com/danielradia21',
        email:'daniel@gmail.com',
        service:'service_yiulmhh',
        template:'template_9aohlmd',
        userId: 'user_bLn4OSfld59OZCZsiGoOb',
    },
    {
        fullname:'Avishai Etach',
        imgUrl:'',
        prof:'Fullstack developer',
        linkedIn:'https://www.linkedin.com/in/avishaietach/',
        github:'https://github.com/avishaiEtach',
        email:'etach89@gmail.com',
        service:'service_pfg1fbl',
        template:'template_wfnxrcc',
        userId: 'user_9bWpjlhF53JskkXB0nhmD',
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
              <CarouselCard member={member} key={member.fullname} handleOpen={handleOpen} getMember={getMember}/>
            ))}
          </Carousel>
          <div className='carousel-arrows'>
          <button className='arrow-back' onClick={() => carousel.slidePrev()}><ArrowBackIcon/></button>
          <button className='arrow-forward' onClick={() => carousel.slideNext()}><ArrowForwardIcon/></button>
          </div>
          <Modal
  className="cardmodel"
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  {
    success ? 
  <div>
      <Alert severity="success" className='email-card-success-alert' >
        <AlertTitle>Success</AlertTitle>
        your email was send — <strong>Thank You!</strong>
      </Alert>
  </div>
  :
  <>
    <div className="modal-header-update">
    <button onClick={handleClose}>X</button>
  </div>
   <div>
      <h1>Contect to {member.fullname}</h1>
      <Formik 
              initialValues={{
                    fullname:'',
                    email:'',
                    message:''
              }}
              onSubmit={async (values) => {
                try{
                  await emailjs.send(member.service, member.template, values, member.userId);
                  handleSuccess();
                   values.fullname=''
                   values.email=''
                   values.message=''
                }
                catch(err) {
                  console.log('Had error on email:', err);
              }
                // alert(JSON.stringify(values,null,2));
              }}
          >
              <Form>
                  <Field
                      as={textFieldOutline}
                      id="fullname"
                      name="fullname"
                      type="text"
                      label="fullname"
                      autoFocus
                  />

                  <Field
                      as={textFieldOutline}
                      id="email"
                      name="email"
                      type="email"
                      label="email"
                  />
                    <Field
                    className="email-from-textarea"
                      as="textarea"
                      id="message"
                      name="message"
                      type="text"
                      label="message"
                      placeholder="Enter Your Message *"
                      required
                  />
                      <Button
                      type="submit"
                      // fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                  >
                      Send
                  </Button>

                         </Form>
                 </Formik>
            </div>
            </>
  }
      </Box>
</Modal>
      </section>
  )
}
