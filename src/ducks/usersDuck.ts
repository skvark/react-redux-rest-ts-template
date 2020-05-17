import createRestDuck from "../utils/restDuckGenerator";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const { reducer, actions } = createRestDuck<User>("users");

export { reducer, actions };
