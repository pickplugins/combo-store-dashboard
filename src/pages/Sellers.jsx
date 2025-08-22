import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import EntriesTable from "../components/EntriesTable";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import { IconRefresh, IconBuildingStore, IconStarFilled, IconStar, IconIdBadge2 } from "@tabler/icons-react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";



function Sellers({ user }) {

	var [appData, setappData] = useState(window.appData);
	const { t } = useContext(AuthContext);

	var [productsData, setproductsData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, });

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	var columns = {
		check: { label: t("Check"), },
		id: { label: t("Product"), callback: callbackTitle, classes: "w-96 text-left" },
		// stockStatus: { label: t("Stock Status"), callback: callbackStock, classes: "text-left" },

		// categories: { label: t("Categories"), callback: callbackCategories, classes: "text-left" },
		// tags: { label: t("Tags"), callback: callbackTags, classes: "text-left" },
		// brands: { label: t("Brands"), callback: callbackBrands, classes: "text-left" },
		// sku: { label: t("SKU"), },
		stockCount: { label: t("Stock"), callback: callbackStock, },
		price: { label: t("Price"), callback: callbackPrice, classes: "text-left" },
		type: { label: "Type", callback: callbackType },

		// refunded_total: { label: "Refunded" },
		status: { label: t("Status"), callback: callbackStatus },
	};

	function delete_products(ids) {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		if (queryPrams.page < 0) {
			return;
		}

		ids = ids != undefined ? ids : selectedRows;

		console.log(selectedRows)

		var postData = {
			ids: ids,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/combo-store/v2/delete_products", {
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

	function add_product() {
		const token = localStorage.getItem("token");

		// if (!token) {
		// 	throw new Error("No token found");
		// }

		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(appData.serverUrl + "wp-json/combo-store/v2/add_product", {
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

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_products", {
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

						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setproductsData({ posts: posts, total: total, maxPages: max_pages })
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

				<div className="flex gap-2 items-center">

					{entry?.featured && (
						<div className="text-amber-500"><IconStarFilled /></div>
					)}
					{!entry?.featured && (
						<div className="text-gray-400"><IconStar /></div>
					)}

					<div style={{ width: "40px", height: "40px", overflow: "hidden" }}>
						<img src={entry?.post_thumbnail_url} alt="" />
					</div>

					<div className="text-left">
						<Link className="text-left text-gray-600 font-medium" to={`/products/${entry?.id}`}>
							{entry?.title}
						</Link>

						<div className="flex gap-2 text-sm text-gray-500">

							<div>#{entry?.id}</div>
							<Link className="" to={`/product/${entry?.id}`}>
								View
							</Link>
							{/* <div className=" ">{entry?.sku}</div> */}
							<div className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => {
								delete_products([entry?.id]);
							}}>Delete</div>


						</div>
					</div>
				</div>
			</td>

		);
	}
	function callbackPrice(entry, columnIndex) {

		var type = entry.type;
		var price = entry.price;
		var oldPrice = entry.oldPrice;

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<div className="flex gap-2">

					{type == "simple" && (
						<></>
					)}
					{type == "external" && (
						<></>
					)}
					{type == "grouped" && (
						<></>
					)}
					{type == "variable" && (
						<></>
					)}






				</div>
			</td>

		);
	}



	function callbackCategories(entry, columnIndex) {


		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<div className="flex text-sm ">
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
			<td className="text-center pl-5"
				key={columnIndex}>
				<div className="flex text-sm">
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
	function callbackBrands(entry, columnIndex) {


		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<div className="flex text-sm ">
					{entry?.brands.map((item, index) => {

						return (
							<>
								<span>{item.name}</span>
								{entry?.brands.length > (index + 1) && (
									<span className="pr-1">, </span>
								)}
							</>
						)

					})}
				</div>
			</td>

		);
	}


	function callbackStock(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>


				<div className="text-left">
					{entry.stockStatus == 'instock' && (
						<span className="">{entry.stockCount}</span>
					)}

					{entry.stockStatus == 'outofstock' && (
						<span className="bg-red-400 px-3 py-1 rounded-sm text-white">Out of Stock</span>
					)}
				</div>

			</td>

		);
	}
	function callbackTotal(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				{entry.order_total} {entry.order_currency}
			</td>

		);
	}
	function callbackStatus(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				{entry.status == 'publish' && (
					<span className="bg-amazon-400 px-3 py-1 rounded-sm text-white">Publish</span>
				)}

				{entry.status == 'draft' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">Draft</span>
				)}
			</td>

		);
	}
	function callbackStock(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>

				{entry?.stockCount}
			</td>

		);
	}
	function callbackType(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>

				{entry.type == 'physical' && (
					<span className="">Physical</span>
				)}

				{entry.type == 'digital' && (
					<span className="">Digital</span>
				)}
			</td>

		);
	}











	return (
		<Layout user={user}>
			<div>

				<div className="flex justify-between px-5 py-3">

					<div className="  text-white bg-gray-600  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
						add_product();
					}}>Add Seller</div>
					<div className="flex gap-3 md:justify-end p-4">
						{selectedRows.length > 0 && (
							<div
								className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
								onClick={() => {
									delete_products();
								}}>
								{t("Delete Products")}
							</div>
						)}


					</div>
				</div>
				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={productsData}
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

export default Sellers;
