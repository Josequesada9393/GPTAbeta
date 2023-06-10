import dotenv from 'dotenv'
import { Context } from 'koa'
import axios from 'axios'


dotenv.config()

//creates prompt for ai
export const aiProp =  (string:string) => {
    return {
       model: "gpt-3.5-turbo",
        messages: [{
            role: 'user',
            content: string
        }],
        temperature: 0,
        max_tokens: 500,
    }
}
//gets email from auth0 token
// export const getAuth0Email = async (ctx: Context) => {
//     const accessToken = await ctx.get('authorization').split(' ')[1]
//     const authResponse = await fetch('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
//         headers: {
//             authorization: `Bearer ${accessToken}`
//         }
//     });
//     const userInfo:any = await authResponse.json()
//     return userInfo.email
// }

export const getAuth0Email = async (ctx: Context) => {
    const accessToken = await ctx.get('authorization').split(' ')[1];
    
    const authResponse = await axios.get('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  
    const userInfo: any = authResponse.data;
    return userInfo.email;
  };
  