import Login from '../modules/auth/view/index';
import React from "react";
import { Route } from "react-router-dom";

import NotFound from "../views/404";

export default () => {
  return (
    <>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="*" element={<NotFound />} />

    </>
  );
};
