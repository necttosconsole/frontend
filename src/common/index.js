const backendDomin = "http://localhost:8080"

const SummaryApi ={
    SignUp :{
        url :`${backendDomin}/api/users/signup`,
        method : "POST",
    },
    singIn :{
        url:`${backendDomin}/api/users/signin`,
        method:"post"
    },

   current_user:{
    url:`${backendDomin}/api/users-details`,
    method:"get"
   }
}
export default SummaryApi