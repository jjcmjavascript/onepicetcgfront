<<<<<<< HEAD
import Login from '../modules/auth/view/index';
import React from "react";
=======
>>>>>>> 15c8a658331758a1e9c9c4565359229b4321d608
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
