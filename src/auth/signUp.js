import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "./cognitoConfig";

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    UserPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
