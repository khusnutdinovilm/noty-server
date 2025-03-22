import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: Number(process.env.SMTP_PORT as string),
      secure: false,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });
  }

  async sendActivationLink(to: string, activationLink: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${process.env.CLIENT_URL}`,
      text: "",
      html: `
        <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href="${activationLink}" target="_blank">${activationLink}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
