import React from "react";
import { navLinks } from "../utils/navlinks";
import Link from "next/link";
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation';

export default function Navbar() {

  const { t, lang } = useTranslation('common');

  return (
    <>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"/>
    <header className="navbar navbar-expand-md">
      <nav className="container-xxl flex-wrap flex-md-nowrap">
        <span className="navbar-brand p-0 me-2">
          Ejemplo App Nextjs
        </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-5" id="bdNavbar">
          <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
            {navLinks.map((link, index) => {
              return (
                  <Link href={link.path} key={index}>
                    <li className="nav-item nav-link navbar-text me-3">{t(link.name)}</li>
                  </Link>
              );
            })}
          </ul>
          <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <li className="nav-item dropdown me-3">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {t("menu.idioma")}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {lang !== 'es' && (
                  <Link href="/" locale="es">
                    <li><a className="dropdown-item" href="#">{ '\uD83C\uDDEA\uD83C\uDDF8'} Español</a></li>
                  </Link>
                )}
                {lang !== 'en' && (
                  <Link href="/" locale="en">
                   <a className="dropdown-item" href="#"> { '\uD83C\uDDEC\uD83C\uDDE7' } English</a>
                  </Link>
                )}
                {lang !== 'nl' && (
                  <Link href="/" locale="nl">
                   <a className="dropdown-item" href="#"> { '\uD83C\uDDF3\uD83C\uDDF1' } Holland</a>
                  </Link>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Otros</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>     
    </header>
    </>
  );
}