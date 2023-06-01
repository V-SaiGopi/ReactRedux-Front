import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";
import './Login.css'


const Updateuser = () => {
    const [id, idchange] = useState(0);
    const [name, namechange] = useState('');
    const [sex, sexchange] = useState('');
    const [dob, dobchange] = useState('');
    const [salary, salarychange] = useState('');
    const [department, departmentchange] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    const userobj = useSelector((state) => state.user.userobj)


    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { id, name, sex, dob, salary, department };
        dispatch(FunctionUpdateUser(userobj, id));
        navigate('/user');
    }

    useEffect(() => {
        dispatch(FetchUserObj(code));
    }, [])

    useEffect(() => {
        if (userobj) {
            idchange(userobj.id);
            namechange(userobj.name);
            sexchange(userobj.sex);
            dobchange(userobj.dob);
            salarychange(userobj.salary);
            departmentchange(userobj.department);
        }
    }, [userobj])

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm('Do you want to Logout?')) {
            navigate('/')
            window.location.reload();
        }
    }

    return (
        <div className="dash-content">
            <div className="container">
                <div className='btn-group btn-group-lg d-flex gap-2' role="group" aria-label="...">
                    <button type="button" className="btn btn-light w-100" onClick={() => navigate('/user')}>Employees</button>
                    <button type="button" className="btn btn-primary w-100 active">Edit</button>
                    <button type="button" className="btn btn-light w-100" onClick={() => navigate('/user/add')}>Add</button>
                    <button type="button" className="btn btn-light w-100" onClick={logout}>Log Out</button>
                </div><br />
                <form onSubmit={handlesubmit} style={{ backgroundColor: 'white' }}>
                    <div className="card-header d-flex" style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h2>Edit User</h2>
                    </div><br />
                    <div className="d-flex" style={{ textAlign: 'left' }}>
                        <div className="row w-50" style={{}}>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name='name' value={name || ''}
                                        onChange={e => namechange(e.target.value)} className="form-control" required></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Sex</label>
                                    <select value={sex || ''} onChange={e => sexchange(e.target.value)} className="form-control" required>
                                        <option value={''}>None</option>
                                        <option value={'M'}>M</option>
                                        <option value={'F'}>F</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>DOB</label>
                                    <input type="date" value={dob || ''} onChange={e => dobchange(e.target.value)} className="form-control" required></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input placeholder='Enter Salary' value={salary || ''} onChange={e => salarychange(e.target.value)} className="form-control" required></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Department</label>
                                    <select value={department || ''} onChange={e => departmentchange(e.target.value)} className="form-control" required>
                                        <option value={''}>None</option>
                                        <option value={'HR'}>HR</option>
                                        <option value={'Sales'}>Sales</option>
                                        <option value={'Accounts'}>Accounts</option>
                                    </select>
                                </div><br />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <button className="btn btn-primary" type="submit">Submit</button> |
                        <Link className="btn btn-danger" to={'/user'}>Back</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Updateuser;