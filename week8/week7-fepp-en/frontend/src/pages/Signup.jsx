import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const name = useField("text");  
  const username = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const street = useField("text");
  const city = useField("text");
  const state = useField("text");
  const zipCode = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      name: name.value,
      username: username.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      address: {
        street: street.value,
        city: city.value,
        state: state.value,
        zipCode: zipCode.value
      }
    });
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Street:</label>
        <input {...street} />
        <label>City:</label>
        <input {...city} />
        <label>State:</label>
        <input {...state} />
        <label>Zip Code:</label>
        <input {...zipCode} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;