import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import GlobalHeader from "../components/GlobalHeader";
import UserProfileEdit from "../components/UserProfileEdit";
import Login from '../components/Login';
import Register from '../components/Register';
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

import ChartComponent from "../components/ChartComponent";
import {
	IconBasketCheck,
	IconClipboardList,
	IconMailSpark,
	IconCloudDataConnection,
	IconAdjustmentsHorizontal,
	IconCalculator,
	IconLayoutSidebarLeftCollapse,
	IconFilterEdit,
	IconDeviceDesktopAnalytics,
	IconFilterStar,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
const Dashboard = () => {
	const { userData, token, t } = useContext(AuthContext);
	// const token = localStorage.getItem("token");

	var [appData, setappData] = useState(window.appData);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", range: '7days', page: 1, order: "DESC", limit: 10, first_date: "", last_date: "" });
	var [loading, setloading] = useState(false);
	var [chartData, setchartData] = useState([]);
	var [statsData, setstatsData] = useState({});

	useEffect(() => {
		fetchPosts()
	}, []);

	useEffect(() => {
		fetchPosts()
	}, [queryPrams]);



	function fetchPosts() {

		const token = localStorage.getItem("token");

		if (!token) {
			//throw new Error("No token found");
			return;
		}


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			range: queryPrams.range,
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};




		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_chart_data", {
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
						setchartData({ labels: res.labels, datasets: res.datasets })


						setloading(false);


						setstatsData({
							total_email_validated: res.total_email_validated,
							total_task: res.total_task,
							total_orders: res.total_orders,
							total_api_keys: res.total_api_keys,
							count_total_credit: res.count_total_credit,
							count_total_credit_used: res.count_total_credit_used,
							total_api_validation: res.total_api_validation,
						})

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


	return (
		<Layout>
			{!userData && (
				<div className="grid xl:grid-cols-2 md:grid-cols-1 gap-20 w-[1200px] px-10 mx-auto mt-10">
					<div>
						<h2 className="my-5 text-2xl">{t("Register")}</h2>

						<Register />
					</div>
					<div>
						<h2 className="my-5 text-2xl">{t("Login")}</h2>

						<Login />
					</div>
				</div>
			)}
			{userData && (
				<div className="p-10">

					<div className=" grid gap-5 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 ">
						<div className="bg-white shadow-sm border border-gray-200 p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px] text-gray-400">
									<IconClipboardList size="40" />
								</div>
								<div>
									<div className="text-md text-gray-600">{t("Total Task")}</div>
									<div className="text-xl font-bold text-gray-600">{statsData?.total_task}</div>
								</div>
							</div>
						</div>
						<div className="bg-white shadow-sm border border-gray-200  p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px] text-gray-400">
									<IconMailSpark size="40" />
								</div>
								<div>
									<div className="text-md text-gray-600">{t("Total Email Validated")}</div>
									<div className="text-xl font-bold text-gray-600">{statsData?.total_email_validated}</div>
								</div>
							</div>
						</div>
						<div className="bg-white shadow-sm border border-gray-200  p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px] text-gray-400">
									<IconCloudDataConnection size="40" />
								</div>
								<div>
									<div className="text-md text-gray-600">{t("Total API Keys")}</div>
									<div className="text-xl font-bold text-gray-600">{statsData?.total_api_keys}</div>
								</div>
							</div>
						</div>
						<div className="bg-white shadow-sm border border-gray-200  p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px] text-gray-400">
									<IconBasketCheck size="40" />
								</div>
								<div>
									<div className="text-md text-gray-600">{t("Total Orders")}</div>
									<div className="text-xl font-bold text-gray-600">{statsData?.total_orders}</div>
								</div>
							</div>
						</div>
						<div className="bg-white shadow-sm border border-gray-200  p-3 rounded-sm">
							<div className="flex items-center gap-3">
								<div className="w-[50px] text-gray-400 ">
									<IconCalculator size="40" />
								</div>
								<div>
									<div className="text-md text-gray-600">{t("Total Credits Used")}</div>
									<div className="text-xl font-bold text-gray-600">{parseInt(statsData?.count_total_credit_used?.cron) + parseInt(statsData?.count_total_credit_used?.api)}</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-12 gap-5 my-8">
						<div className=" xl:col-span-9 sm:col-span-12 bg-white shadow-sm border border-gray-200  p-3 rounded-sm sm:order-2 lg:order-1">
							<div className="text-2xl flex gap-3 items-center text-gray-600">

								<IconDeviceDesktopAnalytics />

								{queryPrams.range == '7days' && (
									<>{t("Last 7 Days Stats")}</>
								)}
								{queryPrams.range == '15days' && (
									<>{t("Last 15 Days Stats")}</>
								)}
								{queryPrams.range == '30days' && (
									<>{t("Last 30 Days Stats")}</>
								)}
								{queryPrams.range == '6months' && (
									<>{t("Last 6 Months Stats")}</>
								)}
								{queryPrams.range == '1year' && (
									<>{t("Last 1 Year Stats")}</>
								)}


								{loading && (
									<Spinner />
								)}
							</div>


							<div className="p-5">
								<ChartComponent chartData={chartData} />
							</div>
						</div>

						<div className="xl:col-span-3 sm:col-span-12 bg-white shadow-sm border border-gray-200  p-5 rounded-sm lg:order-2 sm:order-1">
							<div className="text-2xl flex gap-3 items-center mb-5 text-gray-600">

								<IconAdjustmentsHorizontal />
								{t("Filters")}</div>


							<div className="flex flex-col gap-3">

								<div className={`flex items-center gap-2 hover:bg-amazon-600 p-2 rounded-sm hover:text-white cursor-pointer text-gray-500 ${queryPrams.range == '7days' ? "bg-amazon-600 text-white" : ""}`} onClick={ev => {
									setqueryPrams({ ...queryPrams, range: "7days" })
								}}><IconFilterStar /> Last 7 Days</div>
								<div className={`flex items-center gap-2 hover:bg-amazon-600 p-2 rounded-sm hover:text-white cursor-pointer text-gray-500 ${queryPrams.range == '15days' ? "bg-amazon-600 text-white" : ""}`} onClick={ev => {
									setqueryPrams({ ...queryPrams, range: "15days" })
								}}><IconFilterStar /> Last 15 Days</div>
								<div className={`flex items-center gap-2 hover:bg-amazon-600 p-2 rounded-sm hover:text-white cursor-pointer text-gray-500 ${queryPrams.range == '30days' ? "bg-amazon-600 text-white" : ""}`} onClick={ev => {
									setqueryPrams({ ...queryPrams, range: "30days" })
								}}><IconFilterStar /> Last 30 Days</div>
								<div className={`flex items-center gap-2 hover:bg-amazon-600 p-2 rounded-sm hover:text-white cursor-pointer text-gray-500 ${queryPrams.range == '6months' ? "bg-amazon-600 text-white" : ""}`} onClick={ev => {
									setqueryPrams({ ...queryPrams, range: "6months" })
								}}><IconFilterStar /> Last 6 Months</div>
								<div className={`flex items-center gap-2 hover:bg-amazon-600 p-2 rounded-sm hover:text-white cursor-pointer text-gray-500 ${queryPrams.range == '1year' ? "bg-amazon-600 text-white" : ""}`} onClick={ev => {
									setqueryPrams({ ...queryPrams, range: "1year" })
								}}><IconFilterStar /> Last 1 Year</div>

							</div>

						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Dashboard;
