import React, {useState} from 'react';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';


import classes from './AddUser.module.css';
import Card from '../UI/Card';

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError ] = useState();

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };

    const addUserHandler = (event) => {
        event.preventDefault();

        if(enteredUsername.trim().length === 0  || 
                enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age'
            });
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid age (cant be zero or negative)'
            });
            return;
        }

        props.onAddUser(enteredUsername, enteredAge);
        setEnteredAge('');
        setEnteredUsername('');
    }

    return (
        <Wrapper>
            {error && 
                (<ErrorModal 
                    title={error.title} 
                    message={error.message} 
                    onConfirm={errorHandler}/>)}

            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}/>
                    
                    <label htmlFor="age">Age(years)</label>
                    <input id="age" type="number"
                        value={enteredAge} 
                        onChange = {ageChangeHandler}/>

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser;