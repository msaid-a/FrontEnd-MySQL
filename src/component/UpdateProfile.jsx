import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../config/axios'
import { isNull } from 'util'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'


class UpdateProfile extends Component {
    
    state={
        profile:null
    }


    componentDidMount =  () =>{
        this.getProfile()
    }

    getProfile = async() =>{
        try {
            let res = await axios.get('/users/profile/'+this.props.iD)
            this.setState({profile: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    updateProfile = async() =>{
        let formData = new FormData()

        let name = this.name.value
        let email = this.email.value
        let password = this.password.value
        let avatar = this.avatar.files[0]

        // membuat Properties untuk From Data
        
        try {
            if(avatar){
                formData.append("avatar",avatar)
                await axios.post('/avatarv2/'+this.props.iD, formData)
            }
           let res = await axios.patch('/users/'+this.props.iD, {
               name,email,password
           })   
           console.log(formData.name)
           Swal.fire({
            title: 'Success',
            text: "You tasks is added",
            type: 'success',
          })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if(!this.props.iD){
            return <Redirect to="/login"></Redirect>
        }
        if(!isNull(this.state.profile)){
        let {name, email, age} = this.state.profile
        return (
            <div className="container">
                <form className="form-group" onSubmit={e=> e.preventDefault()}>
                    <h1>Edit Profile</h1>

                    <label>Name :</label>
                    <input className="form-control" type="text" defaultValue={name} ref={input=>{this.name = input}}/>
                    <label>Email :</label>
                    <input className="form-control" type="email" defaultValue={email} ref={input=>{this.email =
                    input}}/>
                    <label>Password :</label>
                    <input className="form-control" type="password" ref={input=>{this.password = input}}/>


                    {/* <div className="custom-file mt-4">
                        <input type="file" className="custom-file-input" id="customFileLang" lang="es" ref={input=>
                        {this.avatar = input}}/>
                        <label className="custom-file-label" htmlFor="customFileLang">Select Image</label>
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Update Photo Profile :</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" ref={input=>
                        {this.avatar = input}}/>
                    </div>


                    <button className="btn btn-primary mt-3" onClick={this.updateProfile}>Save</button>
                </form>
            </div>
        )
    }
    return <h1>Loading...</h1>
    }
}

const mapStateToProps = (state) =>{
    return {
      userName : state.auth.username,
      iD : state.auth.id,
    }
  }
  

export default connect(mapStateToProps)(UpdateProfile)
