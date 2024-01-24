

import bcrypt from 'bcrypt';

const saltRounds = 10;


 export async function encrypt(data){
    return await bcrypt.hash(data, saltRounds);
}


export async function compare(givenData, encryptedData){
    try {
   return await bcrypt.compare(givenData, encryptedData);
    } catch (e) {
        console.log("error while comparing the decrypted data")
        return;
    }
}

