import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Form, Button} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'


const EditCarProfile = (props) =>{
 
//   useEffect onUnload() {
//     browserHistory.push('/');
// }
const [carEdit, setCarEdit] = useState({})

  useEffect( () => {
    const { user_id, id } = props.match.params;
    
    axios.get(`/api/users/${user_id}/cars/${id}`).then(res => {
      setCarEdit(res.data)
    }).catch(err => {
      console.log(err)
    })}, [])


// if (sessionStorage.getItem("is_reloaded")) alert('Reloaded!');
// sessionStorage.setItem("is_reloaded", true);
// const unLoad = () => {
//       window.location.push('/');
//   }
  // useEffect(() => {
    
  // return()
    // <Redirect 
    // to={{
    //   pathname: "/",
    //   state: { from: props.location, },
    // }}
    // />
  //   // Router.refresh();
  //   // refresh: function () {
  //   //   Router.dispatch(location.getCurrentPath(), null);
  //   //   },
  //   if (sessionStorage.getItem("is_reloaded")) alert('Reloaded!');
  //   sessionStorage.setItem("is_reloaded", true);
  // )}, []);

  // const car = props.location.car

  // const defaultValues= {
  //   make: car.make,
  //   model: car.model,
  //   year: car.year,
  //   color: car.color,
  //   license_plate: car.license_plate,
  //   vin: car.vin,
  //   miles: car.miles,
  //   policy_number: car.policy_number,
  //   policy_exp: car.policy_exp,
  //   roadside_ass: car.roadside_ass,
  //   insurance_prov_num: car.insurance_prov_num,
  // }
  const { user_id, id } = props.match.params;

    const handleSubmit = e => {
      e.preventDefault()
      axios.put(`/api/users/${user_id}/cars/${id}`, carEdit).then(res => {
        setCarEdit({...carEdit});
        props.history.goBack()
      }).catch( (err) => {
        console.log(err.response)
      })
    }

    const handleChangeCheckbox= e => {
    setCarEdit({roadside_ass: !carEdit.roadside_ass})}    

    const handleChange = e => {
      const { name, value } = e.target
      setCarEdit({
        [name]: value,
      })
    }

    return(
      <Form onSubmit={handleSubmit}>
      
        <Form.Input
              label="License Plate"
              required
              autoFocus
              name='license_plate'
              value={carEdit.license_plate}
              placeholder='License Plate'
              onChange={handleChange}
            />
            <Form.Input
              label="Vin Number"
              required
              name='vin'
              value={carEdit.vin}
              placeholder='Vin Number'
              onChange={handleChange}
            />
            <Form.Input
              label="Miles"
              required
              name='miles'
              value={carEdit.miles}
              placeholder='Total Miles'
              onChange={handleChange}
            />

            <Form.Input
              label="Policy Number"
              optional
              name='policy_number'
              value={carEdit.policy_number}
              placeholder='Policy Number'
              onChange={handleChange}
            />

            <Form.Input
              label="Policy Expiration"
              type = 'date'
              name='policy_exp'
              value={carEdit.policy_exp}
              placeholder='XX/XX'
              onChange={handleChange}
            />

            <Form.Input
              label="Insurance Provider"
              name='insurance_prov_num'
              value={carEdit.insurance_prov_num}
              placeholder='Insurance Provider'
              onChange={handleChange}
            />

            

          <Form.Checkbox
            label="Roadside Assistance? Check for yes."
            name='roadside_ass'
            onChange={handleChangeCheckbox}
            checked={carEdit.roadside_ass}
          />


        <Button>Update</Button>
    </Form>

    )}

export default EditCarProfile