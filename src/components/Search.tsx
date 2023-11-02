import { KeyboardEvent, useContext } from "react";

import { BsSearch, BsFillBackspaceFill } from "react-icons/bs";

import classes from "./Search.module.css";
import { UserContext } from "../context/UserContext";

type SearchProps = {
  loadUser: (userName: string | null) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  // const [userName, setUserName] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      loadUser(user);
    }
  };

  const handleClear = () => {
    setUser("");
    // setSearch(true);
  };

  return (
    <div className={classes.search}>
      <h2>Busque por um usuário:</h2>
      <p>Conheça seus melhores repositórios</p>
      <div className={classes.search_container}>
        <div className={classes.input_container}>
          <input
            type="text"
            placeholder="Digite o nome do usuário"
            value={user || ""}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleClear}>
            <BsFillBackspaceFill />
          </button>
        </div>
        <button onClick={() => loadUser(user)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
