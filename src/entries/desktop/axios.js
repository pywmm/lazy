import axios from 'axios';
import { Message } from 'element-ui';
import {
  getResponseErrorInterceptor,
  getResponseSuccessInterceptor,
  getRequestLoggerInterceptor,
  getRequestLoggerErrorInterceptor,
  getBaseURL,
} from '@/utils/axios';
import { isServer, isDev } from '@/utils/env';
import logger from '@/utils/logger';

function init() {
  axios.defaults.baseURL = getBaseURL('/');
  axios.defaults.withCredentials = true;

  if (isDev) {
    logger.debug('dev mode: ', global.axiosRequestId, global.axiosResponseId);

    axios.interceptors.request.eject(global.axiosRequestId);
    axios.interceptors.response.eject(global.axiosResponseId);
  }

  global.axiosRequestId = axios.interceptors.request.use(
    getRequestLoggerInterceptor(),
    getRequestLoggerErrorInterceptor(),
  );

  const errorHandler = isServer ? logger.error : Message.error;

  global.axiosResponseId = axios.interceptors.response.use(
    getResponseSuccessInterceptor(errorHandler),
    getResponseErrorInterceptor(errorHandler),
  );
}

export default init;
