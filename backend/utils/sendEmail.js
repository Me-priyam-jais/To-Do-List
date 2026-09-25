import {Resend} from 'resend'


export const sendEmail = async (userEmail, subject, message) => {
const resend = new Resend(process.env.RESEND_API_KEY);
  const {data,error} = await resend.emails.send({
    from:"ToDo App<onboarding@resend.dev>",
    to:[userEmail],
    subject,
    html:message,
  });
  if(error){
    console.log("Resend Error",error)
    throw new Error(error.message);
  }
  console.log("Email send:",data?.id);
  return data;
};
