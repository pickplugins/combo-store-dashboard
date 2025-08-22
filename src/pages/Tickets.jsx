import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import EntriesTable from "../components/EntriesTable";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import { IconRefresh, IconBuildingStore, IconStarFilled, IconStar, IconIdBadge2 } from "@tabler/icons-react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import OpenGraph from "../components/shop-elements/OpenGraph";
import { useCounterStore } from '../store/useCounterStore'



function Tickets({ user }) {

	var [appData, setappData] = useState(window.appData);
	const { t, } = useContext(AuthContext);
	const { notifications, addNotification, userDataX, setUserDataX } = useCounterStore()

	var [ticketsData, setticketsData] = useState(null);
	var [userRoles, setuserRoles] = useState(null);




	var queryPramsX = localStorage.getItem('queryPrams');
	var queryPramsDefault = queryPramsX ? JSON.parse(queryPramsX) : { keyword: "", paged: 1, orderby: "date", order: "DESC", per_page: 10, };
	localStorage.setItem('queryPrams', JSON.stringify(queryPramsDefault));
	var [queryPrams, setqueryPrams] = useState(queryPramsDefault);

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	useEffect(() => {
		if (userDataX != undefined || userDataX != null) {

			var roles = [];
			Object.entries(userDataX?.roles).map(args => {

				var role = args[1]
				roles.push(role)
			})

			setuserRoles(roles);
		}
	}, [userDataX]);

	var columns = {
		check: { label: t("Check"), },
		id: { label: t("Ticket"), callback: callbackTitle, classes: "w-96 text-left" },
		categories: { label: t("Categories"), callback: callbackCategories, classes: "text-left" },
		tags: { label: t("Tags"), callback: callbackTags, classes: "text-left" },

		status: { label: t("Status"), callback: callbackStatus, classes: "text-left" },
		priority: { label: t("Priority"), callback: callbackPriority, classes: "text-left" },
		// markedAs: { label: t("Marked As"), callback: callbackMarkedAs, classes: "text-left" },
		author: { label: t("Author"), callback: callbackAuthor, classes: "text-right" },
	};

	function delete_tickets(ids) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		if (queryPrams.paged < 0) {
			return;
		}

		ids = ids != undefined ? ids : selectedRows;

		//

		var postData = {
			ids: ids,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/promptshub/v2/delete_tickets", {
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

	function add_ticket() {
		const token = localStorage.getItem("token");

		// if (!token) {
		// 	throw new Error("No token found");
		// }

		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/promptshub/v2/add_ticket", {
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

		var queryPrams = localStorage.getItem('queryPrams');
		queryPrams = JSON.parse(queryPrams)


		if (!token) {
			throw new Error("No token found");
		}


		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			paged: queryPrams.paged,
			order: queryPrams.order,
			keyword: queryPrams.keyword,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/promptshub/v2/get_tickets", {
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

						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;




						setticketsData({ posts: posts, total: total, maxPages: max_pages })
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
		localStorage.setItem('queryPrams', JSON.stringify(queryPrams));

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
			<td className=" py-3 pl-5"
				key={columnIndex}>

				<div className="flex gap-3 items-center ">

					{entry?.featured && (
						<div className="text-amber-500 "><IconStarFilled /></div>
					)}
					{!entry?.featured && (
						<div className="text-gray-400"><IconStar /></div>
					)}

					<div className="w-12 h-12 overflow-hidden ">
						{entry?.post_thumbnail_url && (
							<img src={entry?.post_thumbnail_url} alt="" />

						)}
					</div>

					<div className="text-left flex-1">
						<Link className="text-left  font-medium" to={`/tickets/${entry?.id}/`}>
							{entry?.title} - {markedAsLabel(entry.markedAs)}
						</Link>

						<div className="flex gap-3 text-sm ">

							<div>#{entry?.id}</div>
							<Link className="" to={`/tickets/${entry?.id}/`}>
								{t("View")}
							</Link>
							{/* <div className=" ">{entry?.sku}</div> */}
							<div className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => {
								delete_tickets([entry?.id]);
							}}>{t("Delete")}</div>


						</div>
					</div>
				</div>
			</td>

		);
	}




	function callbackCategories(entry, columnIndex) {


		return (
			<td className=" pl-5"
				key={columnIndex}>
				<div className="flex text-sm flex-wrap ">
					{entry?.categories.map((item, index) => {

						return (
							<div >
								<span>{item.name}</span>
								{entry?.categories.length > (index + 1) && (
									<span className="pr-1">, </span>
								)}
							</div>
						)

					})}
				</div>
			</td>

		);
	}
	function callbackTags(entry, columnIndex) {


		return (
			<td className=" pl-5"
				key={columnIndex}>
				<div className="flex text-sm flex-wrap ">
					{entry?.tags.map((item, index) => {

						return (
							<div >
								<span>{item.name}</span>
								{entry?.tags.length > (index + 1) && (
									<span className="pr-1">, </span>
								)}
							</div>
						)

					})}
				</div>
			</td>

		);
	}





	function callbackStatus(entry, columnIndex) {

		return (
			<td className=" pl-5"
				key={columnIndex}>
				{entry.status == 'publish' && (
					<span className="bg-amazon-400 px-3 py-1 rounded-sm text-white">{t("Publish")}</span>
				)}

				{entry.status == 'draft' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">{t("Draft")}</span>
				)}
				{entry.status == 'pending' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">{t("Pending")}</span>
				)}


			</td>

		);
	}

	function callbackPriority(entry, columnIndex) {

		return (
			<td className=" pl-5"
				key={columnIndex}>
				{entry.priority == '1' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">{t("Normal")}</span>
				)}

				{entry.priority == '10' && (
					<span className="bg-amber-400 px-3 py-1 rounded-sm text-white">{t("High")}</span>
				)}
				{entry.priority == '90' && (
					<span className="bg-red-400 px-3 py-1 rounded-sm text-white">{t("Urgent")}</span>
				)}


			</td>

		);
	}

	function markedAsLabel(markedAs) {

		return (
			<>
				{markedAs == 'open' && (
					<span className=" px-3 py-1 rounded-sm text-white">{t("Open")}</span>
				)}

				{markedAs == 'closed' && (
					<span className="text-gray-500 px-3 py-1 rounded-sm ">{t("Closed")}</span>
				)}
				{markedAs == 'processing' && (
					<span className="text-red-400 px-3 py-1 rounded-sm ">{t("Processing")}</span>
				)}


			</>

		);
	}











	function callbackAuthor(entry, columnIndex) {

		return (
			<td className=" px-5 text-right "
				key={columnIndex}>

				<div className="flex  gap-2 items-center justify-end text-sm">

					<div className="w-8 h-8 rounded-full overflow-hidden"><img src={entry?.author?.avatar} alt="" /></div>
					<div>{entry?.author?.name}</div>

				</div>




			</td>

		);
	}












	return (
		<Layout user={user}>

			<OpenGraph
				keywords={"AI prompt marketplace, ChatGPT prompts, Midjourney prompt library, Downloadable AI prompts, Prompt engineering templates"}
				image={""}
				url={"https://promptshub.net/tickets/"}
				title={"PromptsHub.net Support – Submit & Track Your Help Tickets Easily"}
				description={"Need help with PromptsHub.net? Submit support tickets, track responses, and get fast solutions to your issues. Our team is here to assist with prompt tools, billing, and technical questions."}
			/>

			<div>


				<>
					<div className="flex justify-between px-5 py-3">

						<div>
							{/* <div className="  text-white bg-gray-600  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
								add_ticket();
							}}>{t("Add ticket")}</div> */}

							<Link className="text-white bg-gray-600  px-3 py-2 rounded-sm cursor-pointer" to={`/tickets-submit/`} >Create Support Ticket</Link>

						</div>
						<div className="flex gap-3 justify-end ">

							{userRoles?.includes("administrator") && (
								<>
									{selectedRows.length > 0 && (
										<div
											className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
											onClick={() => {
												delete_tickets();
											}}>
											{t("Delete tickets")}
										</div>
									)}
								</>
							)}





						</div>
					</div>
					<EntriesTable
						queryPrams={queryPrams}
						columns={columns}
						entries={ticketsData}
						itemPath={""}
						onChange={onChangeQueryPrams}
						loading={loading}
						selectedRows={selectedRows}
						onSelectRows={onSelectRows}
						onRefreshRequest={onRefreshRequest}

					/>
				</>
				{/* )} */}


			</div>
		</Layout>
	);
}

export default Tickets;
