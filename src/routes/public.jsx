import react from "react";
import { Route } from "react-router-dom";

import Login from '../modules/login';
import NotFound from '../views/404';

export default () => {
    return <>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </>
}; 