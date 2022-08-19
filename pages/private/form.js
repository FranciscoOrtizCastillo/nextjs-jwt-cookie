export default function Form() {
    return (
        <div className="bg-light d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="card p-4 text-light bg-dark mb-5">
                <div className="card-header">
                    <h3>Formulario </h3>
                </div>
                <div className="card-body w-100">
                    <form action="/api/form" method="post">
                        <div className="">
                            <label className="form-label" htmlFor="first">First Name</label>
                            <input className="form-control"
                                type="text"
                                id="first"
                                name="first"
                                required
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="last">Last Name</label>
                            <input  className="form-control" type="text" id="last" name="last" required />
                        </div>

                        <div className="form-group mt-3">
                            <button
                                className="btn bg-primary float-end text-white w-100"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
