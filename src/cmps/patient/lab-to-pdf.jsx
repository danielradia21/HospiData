import logo from '../../assets/img/labs-logo.png';
import { jsPDF } from 'jspdf';

export function LabToPdf({ user, labRes }) {
    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 40, 20, 60, 13);
    doc.addImage(
        labRes.img,
        labRes.imgType,
        labRes.startX,
        70,
        labRes.sizeX,
        labRes.sizeY
    );
    doc.text('From :', 20, 29);
    doc.text(`To : ${user.fullname}`, 20, 42);
    doc.text(`Printed on: ${getPDFDate(new Date())}`, 10, 290);

    function savePDF() {
        doc.save(
            `${user.fullname}-${labRes.title}-${
                new Date().getMonth() + 1
            }-${new Date().getDate()}.pdf`
        );
    }

    function getPDFDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour =
            date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute =
            date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes();
        return `${day}/${month}/${year} ${hour}:${minute}`;
    }

    return (
        <div className="lab-to-pdf-containet">
            <button className="download-btn" onClick={savePDF}>
                Download PDF
            </button>
        </div>
    );
}
