import axios from "axios";
export const saveUser = async (num, code) => {
  const response = await axios.post("http://localhost:5000/api/otp", {
    phonenum: num,
    countrycode: code,
  });
  console.log(response.data.msg);
};

export const sendOTP = async (num, code, otp) => {
  const response = await axios.post(
    "http://localhost:5000/api/phonenumber/auth",
    {
      phonenum: num,
      countrycode: code,
      otp,
    }
  );
  return response.data;
};
