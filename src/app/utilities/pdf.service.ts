import { Injectable, isDevMode } from '@angular/core';
import jsPDF from 'jspdf';
import { ConfigService } from '../environment/config.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private configService: ConfigService
  ) { }

  async generateCertificatePdf(content: string, fileName: string, imageFile: File): Promise<Blob> {
    let width = 2000
    let height = 1414
    let imageUrl = URL.createObjectURL(imageFile);

    let pdf = new jsPDF(
      'l', 
      'px', 
      [width, height]
    );

    pdf.addFileToVFS('THSarabun.ttf', this.configService.getConfigValue('fontPath', isDevMode()));
    pdf.addFont(this.configService.getConfigValue('fontPath', isDevMode()), 'Pridi-Regular', 'normal');
    pdf.setFont('Pridi-Regular');
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
