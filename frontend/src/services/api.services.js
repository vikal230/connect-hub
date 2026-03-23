import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const signup = async ({ name, userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/signup", {
      name,
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error
  }
};

export const signIn = async ({ userName, password }) => {
  try {
    const response = await api.post("/api/auth/signin", { userName, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const sendOtp = async ({ email }) => {
  try {
    const response = await api.post("/api/auth/sendotp", { email });
    console.log(response.data);
    return response.data;
  } catch (error) {
   throw error
  }
};

export const isVerify = async ({ email, otp }) => {
  try {
    const response = await api.post("/api/auth/isverify", { email, otp });
    console.log(response.data);
    return response.data;
  } catch (error) {
  console.log("Error:", error.response?.data?.message);
  }
};

export const resetPassword = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/resetpassword", {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response?.data?.message); 
  }
};


export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/user/current")
    console.log(await response.data)
    return response.data
  } catch (error) {
    
  }
}

export const LogOut = async (req,res) => {
  try {
    const response = await api.get("/api/auth/signout")
    console.log(response.data)
     return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const suggestedUser = async (req, res) => {
  try {
    const response = await api.get("/api/user/suggest")
    console.log(response.data)
    return response.data
  } catch (error) { 
    console.log("frontend api user suggestion error",error)
   throw error
  }
}