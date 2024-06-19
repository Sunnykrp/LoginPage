const bcrypt=require('bcrypt');
const hashPassword=(password)=>
    {
        return new Promise(async (resolve,reject)=>
        {
            try {
              const salt = await bcrypt.genSalt(12);
              const hash = await bcrypt.hash(password,salt);
              resolve(hash);
            } catch (error) {
                reject(error)
            }
            // bcrypt.genSalt(12,(err,salt)=>
            // {
            //     if(err)
            //         {
            //             reject(err)
            //         }
            //         bcrypt.hash(password,salt,(err,hash)=>
            //         {
            //             if(err)
            //                 {
            //                     reject(err);
            //                 }
            //                 resolve(hash);
            //         })
            // })
        })
    }

    const comparePassword=(password,hashed)=>
        {
            return bcrypt.compare(password,hashed);
        }
    
    module.exports={
        hashPassword,
        comparePassword
    }