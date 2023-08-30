import axios from 'axios';
import React, { useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function LeaveApplication() {

    const [data, setData] = useState({
		name: '',
		email: '',
		start_date: '',
		end_date: '',
        reason: ''
		
	})
	const navigate = useNavigate()
	const {id} = useParams();
	
	useEffect(() => {
        axios.get('http://localhost:8081/get/'+id)
            .then(response => {
                const employeeData = response.data;
                setData({
                    name: employeeData.name,
                    email: employeeData.email,
                    start_date: '',
                    end_date: '',
                    reason: ''
                });
            })
            .catch(err => console.log(err));
    }, [id]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("start_date", data.start_date);
		formdata.append("end_date", data.end_date);
		formdata.append("reason", data.reason);
       
		axios.post('http://localhost:8081/apply', formdata)		
		.then(() => {
			navigate('/employeeDetail/'+id);
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4 loginPage text-white'>
			<h2>Leave Application</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
					<label for="inputName" class="form-label ">Name</label>
					<input type="name" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='on'
                    onChange={e => setData({...data, name: e.target.value})}/>
				</div>
                <div class="col-12">
					<label for="inputEmail" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail" placeholder='Enter Email' autoComplete='on'
                    onChange={e => setData({...data, email: e.target.value})}/>
				</div>
                <div class="col-12">
					<label for="inputDate" class="form-label">Start Date</label>
					<input type="date" class="form-control" id="inputDate" placeholder='yyyy-mm-dd' autoComplete='off'
                    onChange={e => setData({...data, start_date: e.target.value})}/>
				</div>
                <div class="col-12">
					<label for="inputDate" class="form-label">End Date</label>
					<input type="date" class="form-control" id="inputDate" placeholder='yyyy-mm-dd' autoComplete='off'
                    onChange={e => setData({...data, end_date: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputComments" class="form-label">Reason</label>
					<input type="text" class="form-control h-100 w-75" id="inputComments" autoComplete='off'
                    onChange={e => setData({...data, reason: e.target.value})}/>
				</div>
				<div class="col-12 pt-5 pb-5">
					<button type="submit" class="btn btn-primary">Apply</button>
				</div>
			</form>
		</div>

  )
}

export default LeaveApplication
