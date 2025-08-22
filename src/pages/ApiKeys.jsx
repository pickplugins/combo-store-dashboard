import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "../components/EntriesTable";
import { AuthContext } from "../components/AuthContext";
import Popover from "../components/Popover";
import { Link } from "react-router-dom";

import { IconCopy, IconX, IconCircleDashedCheck } from "@tabler/icons-react";
import {
	IconPlus,
} from "@tabler/icons-react";
import { callback } from "chart.js/helpers";



function ApiKeys() {

	var [appData, setappData] = useState(window.appData);
	const { token, t } = useContext(AuthContext);

	var [apiKeysData, setapiKeysData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

	var [addApiKey, setaddApiKey] = useState({ title: "", edit: false, loading: false, success: false, errors: false });


	var [getApiKeyPrams, setgetApiKeyPrams] = useState({ adding: false, title: "", email: "public.nurhasan@gmail.com", domain: "", result: null, loading: false }); // Using the hook.

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);


	function fetchPosts() {
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

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_api_keys", {
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

						setapiKeysData({ posts: posts, total: total, maxPages: max_pages })
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

	const [popup, setpopup] = useState(null);

	function createApiKey() {

		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			title: addApiKey.title,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/create_api_key", {
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

						var errors = res?.errors;
						var success = res?.success;



						fetchPosts()

						setaddApiKey({ ...addApiKey, title: "", loading: false, errors: errors, success: success })

						setpopup({
							title: "API Key",
							message: "API key created.",
							apikey: res?.apikey,
							display: true
						});
						// setTimeout(() => {
						// 	// setaddApiKey({ ...addApiKey, title: "", success: null, errors: null })

						// }, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}


	function deleteApiKey(id) {
		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			id: id,
		};
		postData = JSON.stringify(postData);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/delete_api_key", {
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



						//

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

	function delete_api_keys() {
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
		fetch(
			appData.serverUrl + "wp-json/combo-store/v2/delete_api_keys",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: postData,
			}
		)
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

	function deleteRow(id) {
		//
		deleteApiKey(id)
	}






	var columns = {
		check: { label: t("Check") },
		// id: { label: "ID", linkTo: { path: 'apikeys' }, classes: 'w-30' },
		title: { label: t("Title"), classes: 'w-60', callback: callbackTitleLinkTo },
		apikey: { label: t("API key"), classes: 'w-80', callback: callbackMaskAPIKey },
		status: { label: t("Status") },
		username: { label: t("User name") },
		datetime: { label: t("Datetime"), callback: callbackFormatDate },
	}



	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);


	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}

	}

	function onRefreshRequest(rows) {
		fetchPosts();
	}

	function onSelectRows(rows) {
		// 
		setselectedRows(rows);
	}

	function callbackFormatDate(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry.datetime;
		// Ensure date is in a proper format for parsing
		const dateObj = new Date(dateInput.replace(" ", "T"));

		if (isNaN(dateObj)) {
			throw new Error("Invalid date format");
		}

		// Extract date components
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = dateObj.getFullYear();

		// Replace format placeholders with actual values
		//return ;

		return (
			<td
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}




	function callbackMaskAPIKey(entry, columnIndex) {

		console.log(entry);
		var text = entry.apikey;

		if (text?.length <= 4) return text; // If the text is too short, return as is

		const firstPart = text?.slice(0, 4);
		const lastPart = text?.slice(-4);
		const maskedPart = "*".repeat(text?.length - 4);

		//return firstPart + maskedPart + lastPart;

		return (
			<td
				key={columnIndex}>
				{firstPart + maskedPart + lastPart}
			</td>

		);

	}
	function callbackTitleLinkTo(entry, columnIndex) {

		return (
			<td className="text-left pl-5"
				key={columnIndex}>
				<Link className="text-left text-amazon-600 font-bold" to={`/apikeys/${entry.id}`}>
					{entry.title.length == 0 ? "#" + entry.id : entry.title}
				</Link>
			</td>

		);
	}

	return (
		<Layout>
			<div className="relative">
				{popup && popup.display && (
					<Popover className="fixed inset-0 flex items-center justify-center w-[450px] mx-auto">
						<div className="bg-white p-6 shadow-lg rounded-sm relative border-2 border-blue-400">
							<IconX
								className="absolute top-3 right-3 cursor-pointer hover:rotate-90 hover:text-red-500 transition-all duration-300"
								onClick={() => {
									setpopup({ ...popup, apikey: "", display: false });
								}}
							/>
							<h2 className="text-2xl mb-5 flex gap-2 items-center text-amazon-600"><IconCircleDashedCheck />{t("API key created")}.</h2>
							<span className="flex items-center gap-3 px-3 py-2 border border-gray-200 hover:text-amazon-500">
								<span className="">{popup?.apikey}</span>
								<IconCopy
									className="cursor-pointer hover:text-amazon-500 transition-all duration-300"
									onClick={() => {
										navigator.clipboard.writeText(popup?.apikey);
									}}
								/>
							</span>

							<p className="my-4 text-red-400">
								Please save this API key somewhere safe and accessible. For security reasons, you won't be able to view it again through your account. If you lose this API key, you'll need to generate a new one.
							</p>
						</div>
					</Popover>
				)}
				<div className=" p-4 ">
					<div className="flex gap-3 items-center justify-between">
						<div className="flex gap-3 flex-wrap items-center">
							<button
								className="flex gap-2"
								onClick={(ev) => {
									setaddApiKey({ ...addApiKey, edit: !addApiKey.edit });
								}}>
								<IconPlus /> {t("Add")}
							</button>
							{addApiKey.edit && (
								<>
									<input
										type="text"
										placeholder="API Title"
										className="p-3 py-[5px] bg-gray-300 border rounded-sm border-solid "
										value={addApiKey?.title}
										onChange={(ev) => {
											setaddApiKey({ ...addApiKey, title: ev.target.value });
										}}
									/>
									<button
										onClick={(ev) => {
											createApiKey();
											setaddApiKey({ ...addApiKey, loading: true });
										}}
										className="">
										{t("Submit")}
									</button>
								</>
							)}
						</div>

						{addApiKey.loading && <>{t("Loading")}...</>}
						{addApiKey.errors && <>{t("There is an error.")}</>}
						{addApiKey.success && <>{t("Task Added.")}</>}
						{selectedRows.length > 0 && (
							<div
								className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
								onClick={(ev) => {
									delete_api_keys();
								}}>
								{t("Delete API Keys")}
							</div>
						)}
					</div>

					<div></div>
				</div>

				{/* <EntriesTable deleteRow={deleteRow} queryPrams={queryPrams} columns={columns} entries={apiKeysData} itemPath={""} onChange={onChangeQueryPrams} loading={loading} /> */}
				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={apiKeysData}
					itemPath={"apikeys"}
					onChange={onChangeQueryPrams}
					loading={loading}
					selectedRows={selectedRows}
					onSelectRows={onSelectRows}
					onRefreshRequest={onRefreshRequest}

				/>
			</div>
		</Layout>
	);
}

export default ApiKeys;


