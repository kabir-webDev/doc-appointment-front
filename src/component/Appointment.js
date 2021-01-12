import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import "./Appointment.css";

const ContactFormStyle = styled.div`
  .form-input {
    input,
    textarea {
      width: 80%;
      border: 1 px light gray;
      padding: 20px 5px;
      margin: 10px 0;
      border-radius: 10px;

      ::placeholder {
        color: #bdbefc;
        font-size: 18px;
      }
      :focus::placeholder {
        color: #8f8f8f;
      }
    }
    textarea {
      min-height: 40px;
      resize: none;
    }
  }
  @media (max-width: 768px) {
    .form-input {
      input,
      textarea {
        padding: 11px 22px;
      }
      textarea {
        min-height: 50px;
      }
    }
  }
`;
export const InputSubmit = styled.input`
  border: none;
  background: #27ae60;
  color: #fff;
  padding: 2% 7%;
  border-radius: 5px;
  font-size: 25px;
`;

export const Span = styled.span`
  color: red;
  font-size: 13px;
  margin-top: -8px;
  display: block;
  font-style: italic;
`;

function Appointment() {
  const [submitMessage, setSubmitMessage] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    if (data !== undefined) {
      fetch("https://gentle-peak-72928.herokuapp.com/addAppointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setSubmitMessage(true);
            reset();
          }
        });
    }
  };

  return (
    <div>
      <div className="element">
        <ContactFormStyle>
          <form onSubmit={handleSubmit(onSubmit)}>
            {submitMessage && alert("You Got your Appointment")}
            <div>
              <p style={{ color: "darkBlue" }}>
                Select where you want to get Appointment:
              </p>
              <input
                name="appointmentType"
                type="radio"
                value="Hospital"
                ref={register}
              />
              <label for="male">Hospital</label>
              <input
                name="appointmentType"
                type="radio"
                value="Personal"
                ref={register({ required: true })}
              />
              <label for="male">Personal</label>

              {errors.appointmentType && <Span>Type is required</Span>}
            </div>
            <div className="form-input">
              <div className="container">
                <div className="item-1">
                  <input
                    name="name"
                    placeholder="Patient's name"
                    ref={register({ required: true })}
                  />
                  {errors.name && <Span>Name field is required</Span>}
                </div>
                <div className="item-2">
                  <input
                    name="age"
                    placeholder="Patient's age"
                    ref={register({ required: true })}
                  />
                  {errors.age && <Span>Age field is required</Span>}
                </div>
              </div>
            </div>
            <div>
              <p style={{ color: "darkBlue" }}>
                Please select Patient's gender:
              </p>
              <input name="gender" type="radio" value="Female" ref={register} />
              <label for="male">Female</label>
              <input name="gender" type="radio" value="Male" ref={register} />
              <label for="male">Male</label>
            </div>{" "}
            <br />
            <div className="form-input">
              <div className="container">
                <div className="item-1 " id="sel">
                  <label for="Doctor">Select Doctor: </label>
                  <select
                    id="Doctor"
                    name="doctor"
                    ref={register({ required: true })}
                  >
                    <option>Doctor List</option>
                    <option value="Dr. Kabirul Hasan">Dr. Kabirul Hasan</option>
                    <option value="Dr. Sohel Rana">Dr. Sohel Rana</option>
                    <option value="Dr. Rakibul Hasan">Dr. Rakibul Hasan</option>
                    <option value="Dr. Arup Sarker">Dr. Arup Sarker</option>
                  </select>
                  {errors.doctor && <Span>Doctor field is required</Span>}
                </div>
                <div className="item-2 dan" id="sel">
                  <div className="dan">
                    <label for="time">Select Time: </label>
                    <select
                      id="Doctor"
                      name="time"
                      ref={register({ required: true })}
                    >
                      <option>Schedule List</option>
                      <option value="Sunday,2.45pm">Sunday,2.45pm</option>
                      <option value="Monday,1.30pm">Monday,1.30pm</option>
                      <option value="Friday,8.15pm">Friday,8.15pm</option>
                      <option value="Tuesday,3.00pm">Tuesday,3.00pm</option>
                    </select>
                    {errors.time && <Span>Time field is required</Span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-input">
              <textarea
                name="disease"
                placeholder="Describe about Disease"
                ref={register()}
              ></textarea>
              {errors.disease && <Span>Description field is required</Span>}
            </div>
            <InputSubmit type="submit" value="Get Appointment" />
          </form>
        </ContactFormStyle>
      </div>
    </div>
  );
}

export default Appointment;
