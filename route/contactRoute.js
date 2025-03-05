const router = require('express').Router()
const nodemailer = require('nodemailer')

router.post('/contact',(req,res)=>{
    let data = req.body;
    if(data.name.length ===0 || data.email.length === 0 || data.message.length === 0) {
        return res.json({msg: "Please fill all the fields"})
    }
        let smtpTransporter = nodemailer.createTransport({
            service: 'Gmail',
            port:465,
            auth:{
                user: 'tkhoi6753@gmail.com',
                pass: 'qchb qeyo gxmi atqg'
            }
        })
        let mailOptions = {
            from:data.email,
            to: 'tkhoi6753@gmail.com',
            subject: `message from ${data.name}`,
            html: `
            <h3>Ingormations</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${data.message}</p>
            
            
            `
        }
        smtpTransporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Error sending email:", error); // 👈 Debug lỗi
                return res.status(500).json({ msg: "Error sending email", error: error.message });
            }
            console.log("✅ Email sent successfully:", info.response); // 👈 Log khi gửi thành công
            res.status(200).json({ msg: "Thank you for contacting Minh Khoi!❤️❤️" });
        });
        
    
})
module.exports = router;