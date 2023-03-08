import nodemailer from 'nodemailer';


export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'example@gmail.com', // E-posta adresinizi buraya girin
        pass: 'your_password_here', // E-posta şifrenizi buraya girin
      },
    });

    await transporter.sendMail({
      from: 'example@gmail.com', // Gönderen e-posta adresi
      to: to, // Alıcı e-posta adresi
      subject: subject, // E-posta konusu
      html: body, // E-posta içeriği (HTML formatında)
    });

    console.log('E-posta gönderildi!');
  } catch (error) {
    console.error('E-posta gönderilemedi!', error);
  }
}
