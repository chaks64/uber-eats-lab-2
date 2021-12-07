import { gql } from "apollo-boost";

const loginQuery = gql`
  query ($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;


export { loginQuery };