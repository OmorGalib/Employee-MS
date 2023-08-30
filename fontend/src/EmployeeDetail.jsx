import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081/get/'+id)
        .then(res => setEmployee(res.data.Result[0]))
        .catch(err => console.log(err));
    })
    const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}
  return (
    <div>
        <div className='d-flex justify-content-around m-3 p-3'>
            <img src={`http://localhost:8081/images/`+employee.image} alt="" className='empImg h-50 w-50 rounded d-flex justify-content-center align-items-center'/>
            <div className='mt-5 pt-5'>
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: {employee.salary}</h3>
                    <h3>Address: {employee.address}</h3>
                </div>
                <div className='d-flex justify-content-around m-3' >
                    <Link to="/apply" className='btn btn-success me-2'>Apply Leave</Link>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail