import { ReactNode, useEffect, useState } from 'react';
import { postPingToken } from '../queries/postPingToken';
import { API_RESPONSE } from '../queries/responses';
import Container from './Container';

interface Props {
   children: ReactNode | ReactNode[];
}

const AuthorizedRoute = ({ children }: Props) => {
   const [isPinging, setIsPinging] = useState(true);
   const queryPingToken = async (token: string) => {
      setIsPinging(true);
      const response = await postPingToken(token);

      if (response.type === API_RESPONSE.SUCCESS) {
         setIsPinging(false);
      }

      if (response.type === API_RESPONSE.GENERIC_ERROR) {
         window.location.href = '/';
      }
   };

   useEffect(() => {
      const token = localStorage.getItem('auth_token');

      if (token) {
         queryPingToken(token);
      } else {
         window.location.href = '/';
      }
   }, []);

   if (isPinging) {
      return (
         <Container>
            <div className='flex h-[90vh] w-full items-center justify-center'>
               <span className='text-2xl font-semibold text-gray-800'>
                  Authorizing...
               </span>
            </div>
         </Container>
      );
   }

   return <div>{children}</div>;
};

export default AuthorizedRoute;
