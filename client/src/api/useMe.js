import { useQuery } from '@tanstack/react-query';
import axios from './axios';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await axios.get('/api/auth/me');
      return res.data; // { id, email, name, avatar }
    },
  });
}