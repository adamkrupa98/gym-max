import React from "react";
import { getAuth } from "firebase/auth";
const Account = () => {
  const auth = getAuth();
  console.log(auth);
  return (
    <div>
      <div>
        <p>Imię:</p>
      </div>
    </div>
  );
};

export default Account;
