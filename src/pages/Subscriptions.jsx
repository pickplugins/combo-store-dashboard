import { IconRefresh } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Subscriptions({ user }) {
	var [appData, setappData] = useState(window.appData);

	var [subscriptionsData, setsubscriptionsData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({
		keyword: "",
		page: 1,
		order: "DESC",
		limit: 10,
		first_date: "",
		last_date: "",
	});

	const { t, token } = useContext(AuthContext);

	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);

	function onSelectRows(rows) {
		setselectedRows(rows);
	}
	function onRefreshRequest(rows) {
		fetchPosts();
	}

	function delete_subscriptions() {
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
			appData.serverUrl + "wp-json/combo-store/v2/delete_subscriptions",
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

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_subscriptions", {
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
						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setsubscriptionsData({
							posts: posts,
							total: total,
							maxPages: max_pages,
						});
						setloading(false);

						setTimeout(() => { }, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);

	var columns = {
		check: { label: t("Check") },
		id: { label: t("ID"), callback: callbackTitleLinkTo, classes: "w-30" },
		// order_id: { label: "Order id" },
		user_name: { label: t("User name") },
		user_email: { label: t("Email") },
		// test_mode: { label: "Test Mode" },
		trial_ends_at: { label: t("Trial Ends") },
		renews_at: { label: t("Renews") },
		// total: { label: t("Total") },

		datetime: { label: t("Datetime"), callback: callbackFormatDate },
	};

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams);
			fetchPosts();
		}
	}

	function callbackTitleLinkTo(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<Link className="text-left text-amazon-600 font-bold" to={`/apikeys/${entry.id}`}>
					{"#" + entry.id}
				</Link>
			</td>

		);
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




	return (
		<Layout user={user}>
			<div>
				<div className="flex w-full gap-2 md:justify-end p-4">
					{selectedRows.length > 0 && (
						<div
							className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
							onClick={() => {
								delete_subscriptions();
							}}>
							{t("Delete Subscriptions")}
						</div>
					)}


				</div>

				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={subscriptionsData}
					itemPath={"subscriptions"}
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

export default Subscriptions;
