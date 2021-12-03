import React, {useState} from "react";
import imgBack from "../../assets/ContactMe/eback.png"
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollServiceeee";
import Animation from "../../utilities/Animation";
import Typical from "react-typical";
import {FaFacebook, FaGoogle, FaInstagram} from "react-icons/fa";
import "./ContactMe.css"
import axios from "axios";
import {toast} from "react-toastify";

export default function ContactMe(props){

    let fadeInScreenHandler = (screen)=>{
        if(screen.fadeInScreen != props.id)
            return
        Animation.animation.fadeInScreen(props.id)
    }
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [banner, setBanner] = useState("")
    const [bool, setBool] = useState(false)

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleMessage = (e) => {
        setMessage(e.target.value)
    }
    console.log(name)
    const submitForm = async (e) => {
        e.preventDefault()
        try {

        let data={
            name,
            email,
            message,
        }
        setBool(true)
            const res = await axios.post('/contact', data)
            if(name.length === 0 || email.length === 0 || message.length === 0){
                setBanner(res.data.msg)
                toast.error(res.data.msg)
                setBool(false)
            }else  if (res.status === 200){
                setBanner(res.data.msg)
                toast.success(res.data.msg)
                setBool(false)

                setName("")
                setEmail("")
                setMessage("")
            }
        }catch (error){
            console.log(error)
        }
    }


    return(
        <div className="main-container fade-in" id={props.id || ""}>
            <ScreenHeading subHeading={"Lets Keep In Touch"}
                           title={"Contact Me"}>
            </ScreenHeading>
            <div className="central-form">
                <div className="col">
                    <h2 className="title">
                        {""}
                        <Typical
                            loop={Infinity}
                            steps={[
                                'Get In Touch ✉' ,
                                1000,
                            ]}
                        />
                    </h2>
                    <a href="#">
                        <FaFacebook/>
                    </a>
                    <a href="#">
                        <FaGoogle/>
                    </a>
                    <a href="#">
                        <FaInstagram/>
                    </a>
                </div>
                <div className="back-form">
                    <div className="img-back">
                        <h4>Send Your Email Here!</h4>
                        <img src={imgBack} alt="img not found"/>
                    </div>
                    <form action="" onSubmit={submitForm}>
                        <p>{banner}</p>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                        onChange={handleName}
                        value={name}/>

                        <label htmlFor="email">Email</label>
                        <input type="text"
                               onChange={handleEmail}
                        value={email}/>

                        <label htmlFor="message">Message</label>
                        <textarea type="text"
                                  onChange={handleMessage}
                        value={message}/>

                        <div className="send-btn">
                            <button type="submit">
                                send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}