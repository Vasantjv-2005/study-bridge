import { forwardRef } from 'react';
import { Award } from 'lucide-react';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
}

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ studentName, courseName, completionDate }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[800px] h-[566px] bg-white relative overflow-hidden"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Decorative Border */}
        <div className="absolute inset-4 border-4 border-amber-600 rounded-lg" />
        <div className="absolute inset-6 border-2 border-amber-400 rounded-lg" />

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-amber-600 rounded-tl-lg" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-amber-600 rounded-tr-lg" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-amber-600 rounded-bl-lg" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-amber-600 rounded-br-lg" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center">
          {/* Award Icon */}
          <div className="mb-4">
            <Award className="w-16 h-16 text-amber-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-indigo-900 mb-2 tracking-wide">
            CERTIFICATE
          </h1>
          <p className="text-lg text-amber-600 mb-6 tracking-widest uppercase">
            of Completion
          </p>

          {/* Subtitle */}
          <p className="text-gray-600 mb-4">This is to certify that</p>

          {/* Student Name */}
          <h2 className="text-3xl font-bold text-indigo-800 mb-4 border-b-2 border-amber-400 pb-2 px-8">
            {studentName}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-2">has successfully completed the course</p>

          {/* Course Name */}
          <h3 className="text-2xl font-semibold text-indigo-700 mb-8 max-w-md">
            {courseName}
          </h3>

          {/* Footer */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center">
            {/* Completed on date */}
            <p className="text-sm text-gray-600 mb-4">Completed on {completionDate}</p>
            
            {/* Signature and Date row */}
            <div className="flex justify-center items-end gap-24">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 mb-1">CEO</p>
                <div className="w-32 border-t-2 border-gray-400 mb-1" />
                <p className="text-xs text-gray-500">Signature</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 mb-1">{completionDate}</p>
                <div className="w-32 border-t-2 border-gray-400 mb-1" />
                <p className="text-xs text-gray-500">Date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Award className="w-96 h-96 text-indigo-900" />
        </div>
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';
