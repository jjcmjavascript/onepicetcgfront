import { Route } from "react-router-dom";

import NotFound from "../views/404";

export default () => {
  return (
    <>
      <Route path="*" element={<NotFound />} />
    </>
  );
};
