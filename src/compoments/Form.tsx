import { useCallback, useState } from "react";
import Api from "../fakeApi";
import { successMessage, errorMessage, emailExist } from "../static/messages";
import "./Form.css";

const API = Api();
const DEFAULT_NAME = "";
const DEFAULT_EMAIL = "";

const Form = () => {
  const [name, setName] = useState(DEFAULT_NAME);
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (name && email) {
        API.getUsers
          .then((users) => {
            const exist = users.find(
              (user) => user.email.toLowerCase() === email.toLowerCase()
            );

            if (exist) {
              alert(emailExist);
            } else {
              alert(successMessage);
              setName(DEFAULT_NAME);
              setEmail(DEFAULT_EMAIL);
            }
          })
          .catch((e) => {
            alert(e.message);
          });
      } else {
        alert(errorMessage);
      }
    },
    [name, email]
  );

  return (
    <form className='form' onSubmit={onSubmit}>
      <h3 className='header text-white'>Get Free Email Updates!</h3>
      <p className='text-white'>
        Join us for FREE to get instant email updates!
      </p>
      <input
        type='text'
        name='first-name'
        className='input'
        placeholder='First Name'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type='email'
        name='email'
        className='input'
        placeholder='Email Address'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <p className='text-white'>🔐 Your Information is Safe With us!</p>
      <button className='button' type='submit'>
        Get Access Today!
      </button>
    </form>
  );
};

export default Form;
