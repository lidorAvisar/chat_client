import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { API_URL, TOKEN_KEY, doApiMethod } from '../../services/apiService';

const Login = (props) => {

  const { setLogin, setRegister } = useContext(AppContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApiLogin(bodyData);
  };

  //login user
  const doApiLogin = async (loginData) => {
    try {
      const url = API_URL + "/users/login";
      const data = await doApiMethod(url, "POST", loginData);
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token)
        toast.success(`ברוך הבא ${data.name}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setLogin(false);
        }, 2000);
      }
    }
    catch (error) {
      toast.warn('Password or user name wrong!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        limit: 1
      });
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // style={{ backdropFilter: 'blur(5px)' }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Title id="contained-modal-title-vcenter" style={{ borderRadius: '5px 5px 0px 0px', textAlign: 'center', padding: '12px' }}>
        <span>התחברות</span>
      </Modal.Title>
      <Modal.Body dir='rtl' style={{ borderRadius: '0px 0px 5px 5px' }}>
        <form onSubmit={handleSubmit(onSubForm)} className="p-2" id="id_form">
          <label>אימייל:</label>
          <input className="form-control form-floating bg-white dark-false text-dark" {...register("email", { required: true, minLength: 3, maxLength: 100, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="הכנס אימייל . . ." type="email" />
          {errors.email && (<div className="text-danger">* הכנס אימייל תקין</div>)}

          <label className='text-dark fs-5 mt-3'>סיסמא:</label>
          <input className="form-control bg-white dark-false text-dark" {...register("password", { required: true, minLength: 3, maxLength: 100 })} placeholder="הכנס סיסמא . . ." type="password" />
          {errors.password && (<div className="text-danger">* הכנס סיסמא תקינה</div>)}

          <div className="mt-4">
            <button className="btn btn-success">התחבר</button>
            <button onClick={() => { setLogin(false); setRegister(true) }} className="btn btn-primary float-start">להרשם</button>
          </div>
        </form>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  )
}

export default Login