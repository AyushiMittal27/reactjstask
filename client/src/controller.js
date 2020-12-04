import axios from "axios";
export const saveUser = async (num, code,otp) => {
  const response = await axios.post("http://localhost:5000/api/phonenumber/auth", {
    phonenum: num,
    countrycode: code,
    otp
  });
  console.log(response.data.msg);
  return response.data;
};

export const sendOTP = async (num, code) => {
  const response = await axios.post(
    "http://localhost:5000/api/otp",
    {
      phonenum: num,
      countrycode: code,
    }
  );
  return response.data;
};
