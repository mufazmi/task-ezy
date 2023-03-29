import axios from "axios";

interface iSendSms {
    mobile:string,
    text:string
}

interface iSendOtp {
    mobile:string,
    otp:string
}

class SmsService{

    sendOtp = async (data:iSendOtp) =>{
        const text = `EgPaid never calls you asking for OTP. Don't share your OTP with anyone. Your OTP is ${data.otp} Valid for 3 min, ID:78799gdg`;
        const payload:iSendSms = {
            mobile:data.mobile,
            text
        }
        return await this.sendSms(payload);
    }

    /**
     * TEMPRORY DEFINING THE FUNCTION LIKE THIS
     * WE CAN EASILY UTILISE THIS FUNCTION
     */
    
    sendSms = async (data:iSendSms) =>{
        const url = `http://182.18.143.11/api/mt/SendSMS?apikey=xzj3uC95O0qk5MxB6tO1Gg&senderid=EGPAID&channel=TRANS&DCS=0&flashs ms=0&number=${data.mobile}&text=${data.text}&route=15&DLTTemplateId=1207161596306313471`;
        const res = await axios.post(url);
        console.log(res);
        return true;
    }

}



export default new SmsService;