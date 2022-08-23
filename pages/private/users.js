import React, { useEffect } from "react";
import useSWR from 'swr'
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then( (res) => res.json() )
    .then((json) => {
      if ( json.errors ) {
        throw new Error(json.errors[0].message)
      }
      else {
        return json.data
      }
    })

export default function Index() {

  const { t } = useTranslation('users');
  
  const { data, error } = useSWR('{ users { id, firstname, lastname } }', fetcher)

  if (error) return <div>Failed to load : {error.message}</div>
  if (!data) return <div>Loading...</div>

  const { users } = data
  
  return (
    <>
      <h1 className="text-2xl text-center mt-5 font-semibold my-5 mx-5">{t('title')}</h1>
      <div className="container d-flex flex-column justify-content-center">

       <div className="text-center m-auto">
            <Link href={"/private/adduser"} passHref>
            <button
                className="btn bg-primary float-end text-white w-100"
            >
                Añadir Usuario
            </button>
            </Link>
        </div>

        <div className="list-group text-center mt-5 m-auto">
          {users && users.map((user, i) => (
            <div className="list-group-item" key={i}>{`${user.firstname} ${user.lastname}`}</div>
          ))}
        </div>
      </div>
    </>
  )
}