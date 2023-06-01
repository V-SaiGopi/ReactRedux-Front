import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";
import './Login.css'

const Userlisting = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        props.loaduser();
    }, [])
    const handledelete = (code) => {
        if (window.confirm('Do you want to remove?')) {
            props.removeuser(code);
            props.loaduser();
            toast.success('User removed successfully.')
        }
    }

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm('Do you want to Logout?')) {
            navigate('/')
            window.location.reload();
        }
    }

    return (
        props.user.loading ? <div><h2>Loading...</h2></div> :
            props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :

                <div className="dash-content">
                    <div className="container" style={{ color: 'black' }}>
                        <div className='btn-group btn-group-lg d-flex gap-2 mb-3' role="group" aria-label="...">
                            <button type="button" className="btn btn-primary w-100 active">Employees</button>
                            <button type="button" className="btn btn-light w-100">Edit</button>
                            <button type="button" className="btn btn-light w-100" onClick={() => navigate('/user/add')}>Add</button>
                            <button type="button" className="btn btn-light w-100" onClick={logout}>Log Out</button>
                        </div>
                        <div className="form-div">
                            <table className="table table-borderedtable table-bordered table-striped table-hover table-responsive table-light">
                                <thead>
                                    <tr>
                                        <td className="bg-dark text-white">Code</td>
                                        <td className="bg-dark text-white">Name</td>
                                        <td className="bg-dark text-white">Sex</td>
                                        <td className="bg-dark text-white">DOB</td>
                                        <td className="bg-dark text-white">Salary</td>
                                        <td className="bg-dark text-white">Department</td>
                                        <td className="bg-dark text-white">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.user.userlist && props.user.userlist.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.sex}</td>
                                                <td>{item.dob}</td>
                                                <td>{item.salary}</td>
                                                <td>{item.department}</td>
                                                <td>
                                                    <Link to={'/user/edit/' + item.id} className="btn btn-primary">Edit</Link> |
                                                    <button onClick={() => { handledelete(item.id) }} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loaduser: () => dispatch(FetchUserList()),
        removeuser: (code) => dispatch(Removeuser(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);