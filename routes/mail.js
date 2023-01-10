import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'

const router = express.Router();

router.use(cors())
router.post('/', (req, res) => {
   const { toEmail, subject, htmlFile } = req.body;
   const transporter = nodemailer.createTransport(
      // {
      //    host: 'smtp.ethereal.email',
      //    port: 587,
      //    auth: {
      //       user: 'reva.renner88@ethereal.email',
      //       pass: 'asEy61umDf2qJzKGry'
      //    },
      //    tls: {
      //       rejectUnauthorized: false
      //    },
      //    logger: true,
      //    debug: false
      // },
      {
         host: 'smtp.hotcube.my.id',
         port: 465,
         secure: true,
         auth: {
            user: 'admin@hotcube.my.id',
            pass: 'Admin123456789'
         },
         tls: {
            rejectUnauthorized: false
         },
         logger: true,
         debug: false
      },
      {
         from: 'HotCube <admin@hotcube.my.id>',
         headers: {
            'X-Laziness-level': 1000
         }
      }
   );

   const message = {
      to: toEmail,
      subject: subject,
      html: htmlFile,
   };

   transporter.sendMail(message, (error, info) => {
      if (error) {
         console.log('Error occurred');
         console.log(error.message);
         // return process.exit(1);
      } else {
         console.log('Message sent successfully!');
         console.log(nodemailer.getTestMessageUrl(info));
         res.json(nodemailer.getTestMessageUrl(info));
      }
      // transporter.close();
   });
});

export default router;