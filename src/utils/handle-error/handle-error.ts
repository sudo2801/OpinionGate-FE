export const getErrorAndStatusFromErr = (error: any) => {
  if (error.response) { 
    const {status,data } = error.response
          
  return { message:data, status };
  }
   {
    return { message: 'Unknown Error, Please Contact Developers!', status: '' };
  }
};
