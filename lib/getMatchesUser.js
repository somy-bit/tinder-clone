const getMatchesUser = (users,loggrdInUser)=>{
    const newUsers = {...users}

    delete newUsers[loggrdInUser]

     return newUsers
    
}

export default getMatchesUser