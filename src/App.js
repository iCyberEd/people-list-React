import './App.css';
import { useEffect, useState } from 'react';

function PeopleList() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [age, setAge] = useState("")
  const [sexM, setSexM] = useState(true)
  const [sexF, setSexF] = useState(true)

  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect( () => {
    fetch('https://venbest-test.herokuapp.com/')
    .then( res => res.json() )
    .then( arr => {
      setUsers(arr)
      setFilteredUsers(arr)
    })
  }, [])

  useEffect( () => {
    let filtered = users.filter( user => nameFilter(user) && lastnameFilter(user) && ageFilter(user) && sexFilter(user) )
    setFilteredUsers(filtered)

    function nameFilter(user) {
      if (user.name.toLowerCase().includes(name.toLowerCase())){
        return true
      }
      return false
    }

    function lastnameFilter(user) {
      if (user.lastname.toLowerCase().includes(lastname.toLowerCase())){
        return true
      }
      return false
    }
  
    function ageFilter(user) {
      if (user.age.toString() === age || age === ""){
        return true
      }
      return false
    }
  
    function sexFilter(user) {
      if (user.sex === "m" && sexM){
        return true
      }
      if (user.sex === "f" && sexF){
        return true
      }
      return false
    }
  }, [name, lastname, age, sexM, sexF, users])

  function userFilter(e) {
    let fieldId = e.target.id
    let value = e.target.value

    switch (fieldId){
      case "name":
        setName(value)
        break
      case "lastname":
        setLastname(value)
        break
      case "age":
        setAge(value)
        break
      default:
        console.log(`unknown field ${fieldId}`)
    }
  }

  return (
    <div className="App">
      <div className="filter">
        <form action="">
          <fieldset>
            <legend>Фильтры</legend>
            <label htmlFor="name">Имя</label>
            <input name="name" id="name" type="text" value={name} onChange={ e => userFilter(e) } />
            <br/>
            <label htmlFor="lastname">Фамилия</label>
            <input name="lastname" id="lastname" type="text" value={lastname} onChange={ e => userFilter(e) } />
            <br/>
            <label htmlFor="age">Возраст</label>
            <input name="age" id="age" type="text" value={age} onChange={ e => userFilter(e) } />
            <br/>
            <label>Пол</label>
            <label htmlFor="sexm" className="label-sex">М</label>
            <input checked={sexM} name="sex" id="sexm" type="checkbox" onChange={ e => setSexM(!sexM) } />
            <label htmlFor="sexf" className="label-sex">Ж</label>
            <input checked={sexF} name="sex" id="sexf" type="checkbox"  onChange={ e => setSexF(!sexF) } />
          </fieldset>
        </form>
      </div>
      <ul className="usr-list">
        {filteredUsers.map( (usr, i) => (<li key={i} className="usr">
          <div className="name">{usr.name + " " + usr.lastname}</div>
          <div className="age">Возраст: {usr.age}</div>
          <div className="sex">Пол: {usr.sex === "m" ? "мужской" : "женский"}</div>
        </li>))}
      </ul>
    </div>
  );
}

export default PeopleList;
