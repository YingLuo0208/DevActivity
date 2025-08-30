// IdCard.js

function IdCard({ picture, firstName, lastName, gender, height, birth }) {
  return (
    <div className="id-card">
      <img src={picture} alt={`${firstName} ${lastName}`} />  
      <div className="props">
        <p>
          <strong>First Name: </strong>  
          {firstName}
        </p>
        <p>
          <strong>Last Name: </strong>
          {lastName}
        </p>
        <p>
          <strong>Gender: </strong>
          {gender}
        </p>
        <p>
          <strong>Height: </strong>
          {height / 100}m
        </p>
        <p>
          <strong>Birth: </strong>
          {birth.toDateString()}
        </p>
      </div>
    </div>
  );
}

export default IdCard;