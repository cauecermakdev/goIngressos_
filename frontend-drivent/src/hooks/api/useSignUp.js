import useAsync from '../useAsync';
import * as userApi from '../../services/userApi';
import useToken from '../useToken';

export default function useSignUp() {
  const {
    loading: signUpLoading,
    error: signUpError,
    act: signUp,
  } = useAsync(userApi.signUp, false);

  return {
    signUpLoading,
    signUpError,
    signUp,
  };
}
