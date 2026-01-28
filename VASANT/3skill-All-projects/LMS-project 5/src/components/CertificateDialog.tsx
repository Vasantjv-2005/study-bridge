import { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Certificate } from './Certificate';
import { Download, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  courseName: string;
  completionDate: string;
}

export function CertificateDialog({
  open,
  onOpenChange,
  studentName,
  courseName,
  completionDate,
}: CertificateDialogProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `certificate-${courseName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !certificateRef.current) return;

    const certificateHtml = certificateRef.current.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${courseName}</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .certificate-container { 
                width: 100%; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                min-height: 100vh;
              }
            }
            body {
              font-family: Georgia, serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            ${certificateHtml}
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Your Certificate</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6">
          {/* Certificate Preview */}
          <div className="overflow-auto border rounded-lg shadow-lg">
            <Certificate
              ref={certificateRef}
              studentName={studentName}
              courseName={courseName}
              completionDate={completionDate}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={handleDownload} className="gradient-primary">
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
