import UserPool from "./cognitoConfig";
import { CognitoUser } from "amazon-cognito-identity-js";

export const confirmSignUp = (email, confirmationCode) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
