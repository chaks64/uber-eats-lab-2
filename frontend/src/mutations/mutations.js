import { gql } from "apollo-boost";

const signupMutation = gql`
  mutation ($username: String, $password: String, $usertype: String, $fname: String, $lname: String, $restname: String, $add1: String, $add2: String, $pincode: String, $city: String, $state: String, $resttype: String) {
    signUp(username: $username, password: $password, usertype: $usertype, fname: $fname, lname: $lname, restname: $restname, add1: $add1, add2: $add2,pincode: $pincode, city: $city, state: $state, resttype: $resttype) {
      status
    }
  }
`;

const addDishMutation = gql`
  mutation ($rest_id: String, $item_id: String, $name: String, $category: String, $description: String, $price: String, $type: String, $path: String) {
    addDish(rest_id: $rest_id, item_id: $item_id, name: $name, category: $category, description: $description, price: $price, type: $type, path: $path) {
      status
    }
  }
`;

const placeOrder = gql`
  mutation ($username: String, $rest_id: String, $restname: String, $order_status: String, $order_type: String, $address: String, $total_cost: Float, $item: [item]) {
    placeOrder(username: $username, rest_id: $rest_id, restname: $restname, order_status: $order_status, order_type: $order_type, address: $address, total_cost: $total_cost, item: $item) {
      status
  }
}
`;

export { signupMutation, addDishMutation, placeOrder };