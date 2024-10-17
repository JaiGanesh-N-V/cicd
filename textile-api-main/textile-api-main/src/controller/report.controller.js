import { sendResponse } from "../common/common.js";
import { CODES } from "../common/response-code.js";
import html_to_pdf from 'html-pdf-node';
import template from '../helpers/template.js';
import { s3Client } from "../config/aws-config.js";
import { PutObjectCommand } from "@aws-sdk/client-s3"; 

const options = {
    format: 'A4'
};

const bucketName = 'ashoktextiles';

const getReport = (req, res) => {
  const data = req.body;
  const htmlContent = template(data);
  const fileName = 'order_' + data.orderno + '.pdf';
  const file = { content: htmlContent };

  html_to_pdf.generatePdf(file, options)
    .then(pdfBuffer => {
      const params = {
        Bucket: bucketName,
        Key: `order/${fileName}`,
        Body: pdfBuffer,
        ContentType: 'application/pdf'
      };

      const command = new PutObjectCommand(params);

      // Upload PDF buffer to S3 bucket
      s3Client.send(command, (err, data) => {
        if (err) {
          console.error('Error uploading PDF to S3:', err);
          res.status(500).send('Error generating PDF');
        } else {
          console.log('PDF uploaded successfully to S3');

          // Redirect to download URL
          const downloadUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`; // S3 object URL

          // Redirect the user to the download URL
          const responseMessage = sendResponse(CODES.OK, 'Order updated Successfully');
          res.status(responseMessage.status).json(responseMessage);
        }
      });
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    });
};

export { getReport };
