import React, { useEffect } from "react";
import Router from "next/router";
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation';

import profilePic from '/public/img/pexels-brett-jordan-7952673.jpg'

function IndexPage() {

  const { t } = useTranslation('home');

  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      //Router.push("/login");
    }
  });

  return (
    <>
      <h1 className="text-2xl text-center mt-5 font-semibold my-5 mx-5">{t('title')}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Image
        src={profilePic}
        alt="Picture"
        //layout='responsive'
        layout='fixed'
        //objectFit='fill'
        width={500} //automatically provided
        height={500} //automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      </div>
    </>
  )
}

export default IndexPage