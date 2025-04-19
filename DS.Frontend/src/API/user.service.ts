import axios from "../utils/axios";

export const getActiveUserCount = async (): Promise<number> => {
  try {
    const response = await axios.get('/api/users/activeUserCount');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user count:', error);
    return 0;
  }
};

