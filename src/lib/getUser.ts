import axios from "axios";

export const getUser = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
      { withCredentials: true }
    );
    if (res.data) return res.data;
  } catch {
    return null;
  }
};
