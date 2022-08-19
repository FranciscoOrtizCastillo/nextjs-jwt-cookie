import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function DashboardPage() {

  const [user, setUser] = useState(null);

  const router = useRouter();

  const getProfile = async () => {
    try {
      const profile = await axios.get("/api/profile");
      //console.log(profile.data);
      setUser(profile.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      //console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };

  return (
    <main className="bg-light text-black">
      <h1 className="text-center">Dashboard</h1>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-20">
            { user && (<pre className="col-auto">{JSON.stringify(user,null,2)}</pre>) }
          </div>
            <div className="row d-flex align-items-center justify-content-center">
              <button className="col-2 mx-5 btn btn-primary" onClick={() => getProfile()}>Get Profile</button>
              <button className="col-2 mx-5 btn btn-primary" onClick={() => logout()}>Logout</button>
            </div>
          
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
