import React, { useContext, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { AuthContext } from "./AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const EmailSubscribe = () => {
	const navigate = useNavigate();
	const { user, setUser, handleLogin, logging, t } = useContext(AuthContext);
	// const [user, setUser] = useState({ username: "", password: "" });
	const [loading, setloading] = useState(false);
	const [errors, seterrors] = useState(false);
	const [messages, setmessages] = useState([]);
	const [token, setToken] = useState("");
	var [appData, setappData] = useState(window.appData);
	var [formData, setformData] = useState({ name: "", email: "" });


	const handleFormSubmit = async () => {
		setloading(true);


		var postData = JSON.stringify(formData);


		fetch(appData.serverUrl + "wp-json/promptshub/v2/email_subscribe", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {



						var messagesX = res?.messages;
						var errors = res?.errors;
						var messagesX = res?.messages;
						seterrors(errors)
						setmessages(messagesX)
						// var result = JSON.parse(res)



						setloading(false);


					});
				}
			})
			.catch((err) => {
				//this.saveAsStatus = 'error';
				// handle the error

			});













	};






	const handleError = () => {

	};




	return (
		<div>
			<form onSubmit={handleLogin}>
				<div className="grid grid-cols-1 gap-5 text-gray-200">
					<div>
						<label htmlFor="" className="block">
							{t("Name")}
						</label>
						<input
							className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
							type="text"
							name="name"
							value={formData.name}
							placeholder="Write Name"
							onChange={ev => {
								setformData({ ...formData, name: ev.target.value })
							}}
							required
						/>
					</div>
					<div>
						<label htmlFor="" className="block">
							{t("Email")}
						</label>
						<input
							className="p-3 py-[5px] bg-gray-400 border rounded-sm border-solid w-full"
							type="email"
							name="email"
							placeholder="Write Email"
							onChange={ev => {
								setformData({ ...formData, email: ev.target.value })
							}} required
						/>
					</div>


					<button
						className="p-3 py-[5px]  text-white cursor-pointer border rounded-sm border-solid w-full flex gap-2 items-center justify-center"
						type="submit" onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							handleFormSubmit()
						}}>
						{t("Subscribe")} {loading && <Spinner />}
					</button>
				</div>
			</form>

			<div className="my-5">

				{Object.entries(messages).length > 0 && (

					<div className="text-gray-200">
						{Object.entries(messages).map(message => {

							return (
								<div >{message[1]}</div>
							)

						})}
					</div>

				)}
			</div>


		</div>
	);
};

export default EmailSubscribe;
