import { api } from "@/lib/api";

export const generateCode = async (data: {
  userId: number;
  email: string;
}): Promise<boolean> => {
  try {
    await api.post("/code/generate", {
      user_id: data.userId,
      email: data.email,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyCode = async (data: {
  userId: number;
  code: string;
}): Promise<boolean> => {
  try {
    await api.post("/code/verify", {
      user_id: data.userId,
      code: data.code,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
