import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import EntriesTable from "../components/EntriesTable";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import { IconRefresh } from "@tabler/icons-react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";



function Orders({ user }) {

	var [appData, setappData] = useState(window.appData);
	const { t } = useContext(AuthContext);

	var [ordersData, setordersData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	var columns = {
		check: { label: t("Check"), },
		order_id: { label: t("ID"), callback: callbackTitle, classes: "w-30" },
		billing_first_name: { label: t("User"), callback: callbackUserName },
		status: { label: t("Status"), callback: callbackStatus },
		order_total: { label: t("Total"), callback: callbackTotal },
		discount_total: { label: "Discount", callback: callbackDiscount },

		// refunded_total: { label: "Refunded" },
		order_date: { label: t("Datetime"), callback: callbackFormatDate },
	};

	function delete_orders() {
		const token = localStorage.getItem("token");

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
		fetch(appData.serverUrl + "wp-json/combo-store/v2/delete_orders", {
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

		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_orders", {
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

						console.log(res)

						var orders = res?.orders;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setordersData({ posts: orders, total: total, maxPages: max_pages })
						//setqueryPrams({ ...queryPrams, loading: false })
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

	useEffect(() => {
		//checkUser();
	}, []);



	function callbackFormatDate(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry.order_date;
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



	function callbackTitle(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<Link className="text-left text-gray-600 font-bold" to={`/orders/${entry.order_id}`}>
					{"#" + entry.order_id}
				</Link>
			</td>

		);
	}
	function callbackUserName(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				{entry.billing_first_name} {entry.billing_last_name}
			</td>

		);
	}
	function callbackTotal(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<span>{entry.order_total}</span><span dangerouslySetInnerHTML={{ __html: entry?.order_currency }} />

			</td>

		);
	}
	function callbackDiscount(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<span>{entry.discount_total}</span> <span dangerouslySetInnerHTML={{ __html: entry?.order_currency }} />
			</td>

		);
	}
	function callbackStatus(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>

				<div className={` text-sm `}>
					{entry.status == 'pending' && (
						<span className="bg-indigo-400 px-3 py-1 rounded-sm text-white">Pending</span>
					)}
					{entry.status == 'completed' && (
						<span className="bg-amazon-400 px-3 py-1 rounded-sm text-white">Completed</span>
					)}
					{entry.status == 'cancelled' && (
						<span className="bg-red-400 px-3 py-1 rounded-sm text-white">Cancelled</span>
					)}
					{entry.status == 'refunded' && (
						<span className="bg-amber-400 px-3 py-1 rounded-sm text-white">Refunded</span>
					)}
					{entry.status == 'failed' && (
						<span className="bg-red-600 px-3 py-1 rounded-sm text-white">Failed</span>
					)}
					{entry.status == 'processing' && (
						<span className="bg-blue-400 px-3 py-1 rounded-sm text-white">Processing</span>
					)}
					{entry.status == 'on-hold' && (
						<span className="bg-orange-400 px-3 py-1 rounded-sm text-white">Hold</span>
					)}
				</div>





			</td>

		);
	}



	return (
		<Layout user={user}>
			<div>
				<div className="flex gap-3 w-full md:justify-end p-4">
					{selectedRows.length > 0 && (
						<div
							className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
							onClick={() => {
								delete_orders();
							}}>
							{t("Delete Orders")}
						</div>
					)}


				</div>
				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={ordersData}
					itemPath={""}
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

export default Orders;
