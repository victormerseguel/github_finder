import { UserProps } from "../types/user";

import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import Loader from "../components/Loader";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { search, setSearch, user: userName } = useContext(UserContext);

  const loadUser = async (userName: string | null) => {
    setError(false);
    setUser(null);
    setIsLoading(true);

    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();

    setIsLoading(false);

    if (res.status === 404) {
      setError(true);
      return;
    }

    const { avatar_url, login, location, followers, following, name } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
      name,
    };

    setUser(userData);
    setSearch(false);
  };

  useEffect(() => {
    if (search) {
      loadUser(userName);
    }
  }, [search]);

  return (
    <div>
      <Search loadUser={loadUser} />
      {isLoading && <Loader />}
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
