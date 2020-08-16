import React from 'react'

import UsersList from '../components/UsersList';


const Users = () => {

    const USERS = [
        {   
            id: 'u1', 
            name: 'Uche', 
            image: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
            places: 3                
        }
    ];

    return <UsersList items={USERS} />;
    
};

export default Users;
