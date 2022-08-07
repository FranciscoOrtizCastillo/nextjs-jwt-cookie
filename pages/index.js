import React, { useEffect } from "react";
import Router from "next/router";

function IndexPage() {

  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      //Router.push("/login");
    }
  });

  return (
    <div>
      <h1>Index Page</h1>
    </div>
  )
}

export default IndexPage