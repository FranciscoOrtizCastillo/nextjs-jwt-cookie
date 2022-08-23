
import { useState } from "react";
import { useRouter } from 'next/router'

import { setup } from '../../src/csrf/csrf';

export default function Form() {

    const router = useRouter()

    const [user, setUser] = useState({ firstname: "", lastname: "" });

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        var query = `mutation SaveUser($user: InputUser) {
            saveUser(user: $user) {
                id
            }
          }`;
          
          const response = await fetch('/api/graphql', {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                            query,
                            variables: {
                                user: user
                            }
                            })
                        })

          //console.log(response)
          if (response.ok) {
            const data = await response.json()
            //console.log('data returned:', data)

            router.push("/private/users")
          } else {
            console.error(response)
          }
    }

    return (
        <div className="bg-light d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="card p-4 text-light bg-dark mb-5">
                <div className="card-header">
                    <h3>Formulario </h3>
                </div>
                <div className="card-body w-100">
                    <form onSubmit={handleSubmit} >
                        <div className="">
                            <label className="form-label" htmlFor="first">First Name</label>
                            <input className="form-control"
                                type="text"
                                id="first"
                                name="firstname"
                                onChange={handleChange}
                                required
                            />
                            {/*<div id="emailHelp" className="form-text">***********</div>*/}
                        </div>

                        <div className="mt-3">
                            <label className="form-label" htmlFor="last">Last Name</label>
                            <input className="form-control" 
                                type="text" 
                                id="last" 
                                name="lastname" 
                                onChange={handleChange}
                                required />
                        </div>

                        <div className="form-group mt-3">
                            <button
                                className="btn bg-primary float-end text-white w-100"
                                type="submit"
                            >
                                Grabar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Here's the important part. `setup` saves the necesary secret and token.
export const getServerSideProps = setup(async ({req, res}) => {
    return { props: {}}
});
