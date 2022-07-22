import data from "./static/users.json";

export type User = {
  name: string;
  email: string;
};

const Api = () => {
  return {
    getUsers: new Promise<User[]>((resolve) => {
      resolve(data.users);
    }),
  };
};

export default Api;
