import UserPool from "./cognitoConfig";

export const signOut = () => {
    const user = UserPool.getCurrentUser();
    if(user) {
        user.signOut();
    }
}