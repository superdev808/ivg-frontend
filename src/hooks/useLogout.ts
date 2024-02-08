import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/auth/authSlice';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/helpers/cookie';

const useLogout = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const logout = async () => {
		try {
			deleteCookie('appToken', '/');
			deleteCookie('email', '/');
			dispatch(setAuth(false));
	
			router.push('/login');
		} catch (error: any) {
			console.log(error);
		}

	}
	return logout;

};

export default useLogout;
