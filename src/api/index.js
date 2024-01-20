import { API_URLS, LOCAL_STORAGE_TOKEN_KEY } from '../utils';
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application.json', //we are going to send json
    Accept: 'Application/json', //we are going to accept json
  };
  const config = { ...customConfig, headers: {...headers, ...customConfig.headers,}, };
  if(body){
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if(data.success){
      return{
        data: data.data,
        success: true
      }
    }
    throw new Error(data.message);  
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false
    }
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(),{
    method: 'GET',
  });
};
