// import logo from '../../assets/img/logo.png';
import logo from '../../assets/img/labs-logo.png'
import footXRay from '../../assets/img/foot-x-rays.jpg'
import { jsPDF } from "jspdf";
export function LabToPdf({user,labRes}){

    

    const doc = new jsPDF();
    doc.addImage(logo,"PNG",40,20,60,13)
    doc.addImage(labRes.img,labRes.imgType,20,70,150,150)
    doc.text('From :',20,29)
    doc.text(`To : ${user.fullname}`,20,42)


    function savePDF(){
        doc.save("test.pdf")
    }

    return (
        <div className='lab-to-pdf-containet'>
          <button className="download-btn" onClick={savePDF}>Download PDF</button>
  </div>
    )
}
