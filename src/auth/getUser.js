import UserPool from "./cognitoConfig";

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser();

        if(!user) {
            reject("No user logged in");
            return;
        }

        user.getSession((err, _session) => {
            if(err) {
                reject(err);
                return;
            }

            user.getUserAttributes((err, attributes) => {
                if(err) {
                    reject(err);
                    return;
                }

                const userData = {};
                attributes.forEach((a) => {
                    userData[a.Name] = a.Value
                });

                resolve(userData);
            })
        })
    })
}