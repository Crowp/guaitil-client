import moment from 'moment';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';

export const downloadFile = async (endpoint, name = '', token) => {
  const date = moment(new Date()).format('YYYY-MM-DD HH:mm');
  const arrayName = name.split('.');
  const nameWithDate = `${arrayName[0]}_${date + '.' + arrayName[1]}`;
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token.headers.Authorization,
        'Content-Type': 'application/pdf;application/x-xlsx'
      }
    });
    const blob = await response.blob();
    const file = new File([new Blob([blob])], nameWithDate);
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nameWithDate);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (e) {
    const model = new HttpErrorResponseModel();
    model.status = 0;
    model.message = 'Error solicitando los datos';
    model.errors = ['Error solicitando los datos'];
    model.url = endpoint;

    return model;
  }
};
