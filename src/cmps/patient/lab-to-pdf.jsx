// import logo from '../../assets/img/logo.png';
import logo from '../../assets/img/logo.png'
import { jsPDF } from "jspdf";
export function LabToPdf({user,labRes}){

    const doc = new jsPDF();
    doc.addImage(logo,"PNG",40,20,40,13)
    doc.text('Labs',82,30)


    function savePDF(){
        doc.save("test.pdf")
    }

    return (
        <div className='lab-to-pdf-containet'>
          <button className="download-btn" onClick={savePDF}>Download PDF</button>
  </div>
    )
}
