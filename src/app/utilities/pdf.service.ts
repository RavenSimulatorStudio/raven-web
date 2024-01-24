import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async generateCertificatePdf(content: string, fileName: string, imageFile: File): Promise<Blob> {
    let width = 2000
    let height = 1414
    let imageUrl = URL.createObjectURL(imageFile);

    let pdf = new jsPDF(
      'l', 
      'px', 
      [width, height]
    );

    pdf.addFileToVFS('THSarabun.ttf', '../../assets/fonts/Pridi/Pridi Regular.ttf');
    pdf.addFont('../../assets/fonts/Pridi/Pridi Regular.ttf', 'Pridi Regular', 'normal');
    pdf.setFont('Pridi Regular');
    pdf.setFontSize(100);
    pdf.setTextColor(54, 77, 101);

    let text = content;
    let textDimensions = pdf.getTextDimensions(text);

    let textX = (width - textDimensions.w) / 2;
    let textY = height / 2 + 15;

    pdf.addImage(imageUrl, 'JPEG', 0, 0, width, height);
    pdf.text(text, textX, textY);

    let pdfData = pdf.output('arraybuffer');
    let pdfBlob = new Blob([pdfData], {type: 'application/pdf'});
    return pdfBlob;
  }
}
