import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function authLogin(code: string) {
  axios
    .post(`/api/login`, {
      code,
    })
    .then((res) => {
      console.log('successful login: ', res);
    })
    .catch((err) => {
      console.error(err);
    });
}
