import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "../components/EntriesTable";
import Spinner from "../components/Spinner";
import { IconRefresh } from "@tabler/icons-react";
import { AuthContext } from "../components/AuthContext";
import Popover from "../components/Popover";
import { useParams, useLocation } from 'react-router-dom';

import {
	IconPlus,
} from "@tabler/icons-react";


function Spammers() {
	const { id } = useParams();



	const { userData, handleLogout } = useContext(AuthContext);



	var [appData, setappData] = useState(window.appData);

	var [requestData, setrequestData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ domain: id, keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });
	var [validateMailPrams, setvalidateMailPrams] = useState({ email: '', apikey: 'lWl6^EDwPUbLsrqwPz0&Ki2^VO1038#dqJ1Nf4Ss', testType: "", result: {}, loading: false });

	var [addCredits, setaddCredits] = useState({
		amount: 100,
		type: "",
		source: "",
		userid: 1,
		edit: false,
		loading: false,
		success: false,
		errors: false,
	});
	var [userRoles, setuserRoles] = useState(null);


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);
	var [domains, setdomains] = useState([]);

	const { t, token } = useContext(AuthContext);


	useEffect(() => {

		if (userData != undefined || userData != null) {

			var roles = [];

			Object.entries(userData?.roles).map(args => {

				var role = args[1]

				roles.push(role)

			})

			setuserRoles(roles);

		}
	}, [userData]);

	function onSelectRows(rows) {
		setselectedRows(rows);
	}

	function delete_validation() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/combo-store/v2/delete_validation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var errors = res?.errors;
						var success = res?.success;

						setloading(false);

						fetchPosts();

						// setaddTask({ ...addTask, loading: false, errors: errors, success: success })

						// setTimeout(() => {
						// 	setaddTask({ ...addTask, title: "", success: null, errors: null })

						// }, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}


	function fetchPosts() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			domain: queryPrams.domain,
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_spammers", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;
						console.log(posts);


						setrequestData({ posts: posts, total: total, maxPages: max_pages })
						setloading(false);

						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}

	function fetchDomains() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_spammer_domains", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {


						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						//console.log(posts);

						setdomains(posts)
						setloading(false);

						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}








	function validateEmail() {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			email: validateMailPrams.email,
			apikey: validateMailPrams.apikey,
		};
		postData = JSON.stringify(postData);
		setvalidateMailPrams({ ...validateMailPrams, loading: true })

		fetch(appData.serverUrl + "wp-json/combo-store/v2/validate_email_by_user", {
			method: "POST",
			mode: "cors",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						//var result = JSON.parse(res);
						setvalidateMailPrams({ ...validateMailPrams, result: res, loading: false })



						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}







	useEffect(() => {
		fetchDomains();
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);



	var validationPrams = {
		status: {
			label: t("Status"),
			value: "status",
		},
		safeToSend: {
			label: t("Safe To Send"),
			value: "safeToSend",
		},
		isFreeEmailProvider: {
			label: t("Free Email Provider"),
			value: "isFreeEmailProvider",
		},
		isInboxFull: {
			label: t("Inbox Full"),
			value: "isInboxFull",
		},
		isGibberishEmail: {
			label: t("Gibberish Email"),
			value: "isGibberishEmail",
		},
		isSMTPBlacklisted: {
			label: t("SMTP Blacklisted"),
			value: "isSMTPBlacklisted",
		},
		isDisposableDomain: {
			label: t("Disposable Domain"),
			value: "isDisposableDomain",
		},
		isCatchAllDomain: {
			label: t("Catch All Domain"),
			value: "isCatchAllDomain",
		},
		isSyntaxValid: {
			label: t("Syntax Valid"),
			value: "isSyntaxValid",
		},
		isValidEmail: {
			label: t("Valid Email"),
			value: "isValidEmail",
		},
		hasValidDomain: {
			label: t("Has Valid Domain"),
			value: "hasValidDomain",
		},
		isRoleBasedEmail: {
			label: t("Role Based Email"),
			value: "isRoleBasedEmail",
		},
		verifySMTP: {
			label: t("Verify SMTP"),
			value: "verifySMTP",
		},
		checkDomainReputation: {
			label: t("Domain Reputation"),
			value: "checkDomainReputation",
		},
	};

	var columns = {
		check: { label: t("Check") },
		// id: { label: t("ID"), classes: 'text-left' },
		email: { label: t("Email"), classes: 'w-40' },
		report_count: { label: t("Report Count"), order: 'DESC' },
		level: { label: t("Level"), order: 'DESC' },

		domains: { label: t("Domains"), linkTo: { path: 'spammers', prams: 'domain:id' } },
		last_date: { label: t("Last date") },
		// datetime: { label: t("Datetime") },
	};

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}

	}

	return (
		<Layout>
			<div>

				{JSON.stringify(queryPrams)}

				<div className="flex w-full justify-between p-4">

					<div className="flex items-center gap-2">

						{userRoles?.includes("administrator") && (
							<>
								<div className="relative">
									<button
										className="flex gap-2 "
										onClick={(ev) => {
											setaddCredits({ ...addCredits, edit: !addCredits.edit });
										}}>
										<IconPlus />	{t("Add")}
									</button>
									{addCredits.edit && (
										<Popover className="top-full left-0 min-w-[400px] mt-2 bg-white px-4 py-3 rounded-sm grid grid-cols-2 gap-4 border border-gray-400">
											<input
												type="text"
												placeholder="100"
												className="p-3 py-[5px]  bg-gray-300 border rounded-sm border-solid "
												value={addCredits?.amount}
												onChange={(ev) => {
													setaddCredits({
														...addCredits,
														amount: ev.target.value,
													});
												}}
											/>
											<input
												type="text"
												placeholder="123"
												className="p-3 py-[5px]  bg-gray-300 border rounded-sm border-solid "
												value={addCredits?.userid}
												onChange={(ev) => {
													setaddCredits({
														...addCredits,
														userid: ev.target.value,
													});
												}}
											/>
											<select
												name=""
												id=""
												className=" rounded-sm border-solid border-2 border-blue-500 py-[5px] px-2 cursor-pointer"
												value={addCredits?.type}
												onChange={(ev) => {
													setaddCredits({
														...addCredits,
														type: ev.target.value,
													});
												}}>
												<option value="">{t("Type..")}</option>
												<option value="credit">{t("Credit")}</option>
												<option value="debit">{t("Debit")}</option>
											</select>
											<select
												name=""
												id=""
												className=" rounded-sm border-solid border-2 border-blue-500 py-[5px] px-2 cursor-pointer"
												value={addCredits?.source}
												onChange={(ev) => {
													setaddCredits({
														...addCredits,
														source: ev.target.value,
													});
												}}>
												<option value="">{t("Source..")}</option>
												<option value="instant">{t("Instant")}</option>
												<option value="daily">{t("Daily")}</option>
												<option value="API">{t("API")}</option>
												<option value="cron">{t("Cron")}</option>
												<option value="monthly">{t("Monthly")}</option>
												<option value="register">{t("Register")}</option>
											</select>
											<button
												onClick={(ev) => {
													createCredits();
													setaddCredits({ ...addCredits, loading: true });
												}}
												className="">
												{t("Submit")}
											</button>
										</Popover>
									)}
								</div>

								<div>
									{addCredits.loading && <>{t("Loading...")}</>}
									{addCredits.errors && <>{t("There is an error.")}</>}
									{addCredits.success && <>{t("Task Added.")}</>}
								</div>
							</>
						)}

						<select
							name=""
							id=""
							className=" rounded-sm border-solid border-2 border-blue-500 py-[5px] px-2 cursor-pointer"
							value={queryPrams?.domain}
							onChange={(ev) => {


								console.log(ev.target.value);

								setqueryPrams({
									...queryPrams,
									domain: ev.target.value,
								});
							}}>
							<option value="">{t("Domain..")}</option>

							{domains.map(domain => {

								return (
									<option value={domain.id}>{domain.domain}</option>
								)

							})}


						</select>


					</div>







					<div className="flex gap-2 items-center">
						{selectedRows.length > 0 && (
							<div
								className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
								onClick={() => {
									delete_validation();
								}}>
								{t("Delete Items")}
							</div>
						)}

						<button
							onClick={() => {
								fetchPosts();
							}}
							className="">
							<IconRefresh />
						</button>
					</div>
				</div>
				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={requestData}
					itemPath={""}
					onChange={onChangeQueryPrams}
					loading={loading}
					selectedRows={selectedRows}
					onSelectRows={onSelectRows}
				/>


			</div>
		</Layout>
	);
}

export default Spammers;


