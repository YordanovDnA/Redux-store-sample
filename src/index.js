import configureStore from "./store/configureStore";
import {
  loadCustomers,
  addCustomer,
  removeCustomer,
} from "./store/customers";
import {
  loadUsers,
  addUser,
  changeUserEmail,
  changeUserPassword,
  removeUser,
} from "./store/users";
import  axios  from 'axios';
import config from  "../config.json";

const store = configureStore();


const ApiRespondTest = async() => {
  document.getElementById("app").innerHTML = "<div style='font-size: 20px; text-align: center; background-color: #82B8D9; padding: 20px'>    Hi welcome to Redux-store-sample. Let me run a quick API network test for you.</br> It can take couple of second..</div>"
try {
 const result = await axios.get(config.TEST_URL)
 document.getElementById("app").innerHTML = "<div style='background-color: #94CCAD; padding: 20px'>Connection with the API was successful. Enjoy your hack!</div>"
  runActions();
} catch (error) {
  document.getElementById("app").innerHTML = "<div style='background-color: tomato; padding: 20px'>Error: net::ERR_CONNECTION_REFUSED </br> Reffer to: <a target='_blank' href='http://google.com'>http://error</a> </div>"
}
  
}

ApiRespondTest();

const runActions = () =>{
  
  // UI Layer
  
  //Getting all users
  
  store.dispatch(loadUsers());
  
  //Add new user
  
  setTimeout(() => {
    store.dispatch(
      addUser({
        id: "9fa3ad5d-7a8a-4479-8cd3-e05354af20000",
        gender: "female",
        name: {
          title: "Mrs",
          first: "New",
          last: "Zhu",
        },
        email: "lutske.zhu@example.com",
        login: {
          username: "bluewolf101",
          password: "somerset",
        },
        picture: {
          large: "https://randomuser.me/api/portraits/women/35.jpg",
          medium: "https://randomuser.me/api/portraits/med/women/35.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/women/35.jpg",
        },
        accessLevel: 1,
        jobTitle: "Editor",
      })
    );
  }, 2000);
  
  //Change email of user by user id
  
  setTimeout(() => {
    store.dispatch(
      changeUserEmail(
        "9fa3ad5d-7a8a-4479-8cd3-e05354af720d",
        "NewEmail@gmail.com"
      )
    );
  }, 4000);
  
  //Change user password by user id
  
  setTimeout(() => {
    store.dispatch(
      changeUserPassword(
        "9fa3ad5d-7a8a-4479-8cd3-e05354af20000",
        "new password"
      )
    );
  }, 6000);
  
  setTimeout(() => {
    store.dispatch(removeUser("9fa3ad5d-7a8a-4479-8cd3-e05354af20000"));
  }, 8000);
  
  //Get customers
  
  setTimeout(() => {
    store.dispatch(loadCustomers());
  }, 10000);
  
  //Add new customer
  
  setTimeout(() => {
    store.dispatch(
      addCustomer({
        id: "82ccf663-e950-4862-aba5-ags2555-2sff",
        gender: "female",
        name: {
          title: "Ms",
          first: "New",
          last: "Castro",
        },
        location: {
          street: {
            number: 9627,
            name: "Calle de Atocha",
          },
          city: "Jerez de la Frontera",
          state: "Canarias",
          country: "Spain",
          postcode: 89492,
        },
        email: "julia.castro@example.com",
        login: {
          username: "goldenostrich453",
          password: "pegasus",
        },
        dob: {
          date: "1952-09-24T17:59:13.081Z",
          age: 68,
        },
        picture: {
          large: "https://randomuser.me/api/portraits/women/68.jpg",
          medium: "https://randomuser.me/api/portraits/med/women/68.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/women/68.jpg",
        },
      })
    );
  }, 12000);
  
  //Remove Customer by id
  
  setTimeout(() => {
    store.dispatch(removeCustomer("82ccf663-e950-4862-aba5-ags2555-2sff"));
  }, 16000);
}
