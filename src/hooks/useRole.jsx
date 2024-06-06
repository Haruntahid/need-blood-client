import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isPending: Loading } = useQuery({
    queryKey: [user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      console.log(res.data.getRole);
      return res.data.getRole;
    },
  });
  return [role, Loading];
}

export default useRole;
