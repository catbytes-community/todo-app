import UserPool from "./cognitoConfig";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

export const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (session) => {
                resolve(session);
            },
            onFailure: (err) => {
                reject(err);
            }
        })
    })
}