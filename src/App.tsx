import axios from "axios";
import { useEffect, useState } from "react";

interface DataType {
  id: number;
  name: string;
  username: string;
  email: string;
}

async function fetchData(): Promise<DataType[]> {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  const data: DataType[] = await res.data;
  return data;
}

export default function App() {
  const [users, setUsers] = useState<DataType[]>([]);

  const [selected, setSelected] = useState<string>("Todo");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const userLsit: DataType[] = await fetchData();
      setUsers(userLsit);
    })();
  }, []);

  const deleteUser = (id: number) => {
    const updatedUser = users.filter((user) => user.id !== id);
    setUsers(updatedUser);
  };

  const createUser = () => {
    const newUser: DataType = {
      id: users.length + 1,
      name: "New User",
      username: "newUser",
      email: "new@users.com",
    };
    setUsers((prev) => [...prev, newUser]);
  };

  if (users.length < 0) {
    return <p>loading..</p>;
  }

  return (
    <>
      <header className="max-w-[1200px] mx-auto ">
        <h1 className="text-2xl font-semibold text-blue-500 text-center py-5">
          Todo App with typeScript
        </h1>
      </header>
      <section className="grid grid-cols-4 gap-10 m-10 ">
        {users.map((user, i) => {
          return (
            <div
              key={i}
              className="flex justify-center items-start border flex-col p-5 rounded relative"
            >
              <h3>{user.name}</h3>
              <p>{user.username}</p>
              <span>{user.email}</span>
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className={` ${
                    selected === "Todo"
                      ? "bg-orange-500"
                      : selected === "Completed"
                      ? "bg-green-500"
                      : "bg-purple-500"
                  } px-4 py-2 rounded font-semiboold text-white`}
                >
                  {selected}▼
                </button>
              </div>
              <button
                className="absolute top-0 right-1 bg-black text-white w-6 h-6 rounded-full"
                onClick={() => setOpen(!open)}
              >
                X
              </button>
              <div className="flex items-center justify-between w-full space-x-3 font-semibold">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 outline-none rounded text-white flex-1 mt-3 "
                >
                  Delete
                </button>
                {open && (
                  <div className="absolute -bottom-4 left-0 bg-white z-50 p-2 rounded">
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => setSelected("Todo")}
                    >
                      Todo
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => setSelected("Completed")}
                    >
                      Completed
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => setSelected("In Process")}
                    >
                      In Process
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <button
            onClick={() => createUser()}
            className="bg-blue-500 w-[100px] hover:bg-blue-600 px-4 py-2 flex-1 outline-none rounded text-white mt-3"
          >
            Create new user
          </button>
        </div>
      </section>
    </>
  );
}
