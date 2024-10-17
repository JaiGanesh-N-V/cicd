import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false, // Use `true` for port 465, `false` for all other ports
  service: 'gmail',
  auth: {
    user: 'koushik3dto2y@gmail.com',
    pass: 'xgxt pwoe iqrb aztn',
  },
});

const mailObj = async data => {
  if (data.attachments) {
    return {
      from: process.env.FROM_MAIL,
      to: data.mailto,
      subject: data.subject,
      text: data.content,
      attachments: [
        {
          filename: 'productDetailsExl.xlsx',
          path: 'tempUploads/productDetailsExl.xlsx',
        },
      ],
    };
  }
  return {
    from: process.env.FROM_MAIL,
    to: data.mailto,
    subject: data.subject,
    text: data.content,
  };
};

export { transporter, mailObj };
