import {
	IconBasketCheck,
	IconStarHalfFilled,
	IconAdjustmentsAlt,
	IconTrolley,
	IconDashboard,
	IconPropeller,
	IconRotateRectangle,
	IconX,
	IconSubtask,
	IconShoppingBagHeart, IconMessageUser,
	IconBuildingStore,
	IconTags,
	IconUserPin,
	IconTruckDelivery,
	IconRosetteDiscount,
	IconBike,
	IconReceiptRefund,
	IconUserDollar,
	IconBox,
} from "@tabler/icons-react";
import { Children, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Accounts from "./Accounts";
import { AuthContext } from "./AuthContext";
import ToggleContent from "./ToggleContent";

const Sidebar = ({ user }) => {
	const { navToggle, setnavToggle, changeLanguage, lang, t } = useContext(AuthContext);
	var appData = window.appData;

	const token = localStorage.getItem("token");

	const location = useLocation();
	var currentLocation = location.pathname;

	console.log(currentLocation);


	var navs = [
		{ label: t("Dashboard"), value: "dashboard", icon: <IconDashboard /> },
		{ label: t("Store"), value: "store", icon: <IconBuildingStore /> },
		{ label: t("Products"), value: "products", icon: <IconBox />, parent: "store" },
		{ label: t("Reviews"), value: "reviews", icon: <IconStarHalfFilled />, parent: "store" },
		{ label: t("Categories"), value: "categories", icon: <IconSubtask />, parent: "store" },
		{ label: t("Tags"), value: "tags", icon: <IconTags />, parent: "store" },
		{ label: t("Coupons"), value: "coupons", icon: <IconRosetteDiscount />, parent: "store" },
		{ label: t("Wishlist"), value: "wishlist", icon: <IconShoppingBagHeart />, parent: "store" },
		{ label: t("Brands"), value: "brands", icon: <IconPropeller />, parent: "store" },


		{ label: t("Sell"), value: "sell", icon: <IconBasketCheck /> },
		{ label: t("Orders"), value: "orders", icon: <IconBasketCheck />, parent: "sell" },
		{ label: t("Delivery "), value: "delivery ", icon: <IconTruckDelivery />, parent: "sell" },

		{ label: t("Refunds"), value: "refunds", icon: <IconReceiptRefund />, parent: "sell" },
		{ label: t("Subscriptions"), value: "subscriptions", icon: <IconRotateRectangle />, parent: "sell" },

		{ label: t("Users"), value: "users", icon: <IconUserDollar />, },
		{ label: t("Customers"), value: "customers", icon: <IconUserDollar />, parent: "users" },
		{ label: t("Suppliers"), value: "suppliers", icon: <IconTrolley />, parent: "users" },
		{ label: t("Sellers"), value: "sellers", icon: <IconUserPin />, parent: "users" },
		{ label: t("Riders "), value: "riders ", icon: <IconBike />, parent: "users" },

		{ label: t("Support "), value: "support ", icon: <IconMessageUser />, },
		{ label: t("Settings "), value: "settings ", icon: <IconAdjustmentsAlt />, },
		// { label: t("Credits"), value: "credits", icon: <IconCards /> },
		// { label: "CreditsLogs", value: "creditslogs", icon: <IconDatabaseEdit /> },
		// { label: "Licenses", value: "licenses", icon: <IconBasketCheck /> },

	];

	// const [toggle, settoggle] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setnavToggle(true);
			}
		};

		// Run once on mount to ensure correct state
		handleResize();

		// Listen for window resize
		window.addEventListener("resize", handleResize);

		// Cleanup listener on unmount
		return () => window.removeEventListener("resize", handleResize);
	}, [setnavToggle]);




	function buildNavTree(navs) {
		const map = {};
		const tree = [];

		// First, create a lookup map
		navs.forEach(item => {
			map[item.value] = { ...item, children: [] };
		});

		// Then, build the tree
		navs.forEach(item => {
			if (item.parent) {
				if (map[item.parent]) {
					map[item.parent].children.push(map[item.value]);
				}
			} else {
				tree.push(map[item.value]);
			}
		});

		return tree;
	}

	const navTree = buildNavTree(navs);








	return (
		<aside
			className={`max-w-[300px]  flex flex-col h-screen  text-gray-800 px-5 py-5 fixed md:static inset-y-0 left-0 z-50 transform bg-white transition-transform duration-200 ease-in-out md:transform-none
					${navToggle ? "translate-x-0" : "-translate-x-full"} ${!navToggle && "lg:w-[300px] "
				}`}>
			<div className="bg-white pb-3 block mb-5 border-b relative">
				<button
					onClick={() => setnavToggle(!navToggle)}
					className="md:hidden p-2 rounded-lg text-error-500 absolute top-0 right-0 bg-red-500 !hover:bg-red-600 text-white">
					<IconX className="h-8 w-5 text-white" />
				</button>
				<div className="flex gap-3 items-center mb-3">
					{/* <div className={`  ${navToggle ? "" : "hidden "}  `}>
						<img src="/logo-shape.png" alt="" />
					</div> */}
					<div
						className={` md:block text-3xl"
						} flex gap-3 justify-between items-center w-full`}>
						<div className="flex gap-3 items-center justify-between">
							<Link to={`/`} className="text-center">
								<img src="/logo-h.png" className="mx-auto" width={200} alt="" />
							</Link>
						</div>
					</div>
				</div>
				{/* <select
					onChange={(e) => {
						changeLanguage(e.target.value);
					}}
					value={lang}
					className="!text-white  bg-amazon-600 hover:bg-amazon-500 !py-[7px] ">
					<option value="en">English</option>
					<option value="bn">Bangla</option>
					<option value="hi">Hindi</option>
					<option value="zh">Chinese</option>
					<option value="ja">Japanese</option>
					<option value="es">Spanish</option>
				</select> */}
			</div>

			<>

			</>


			{token ? (
				<>
					<div className="flex flex-col flex-1">
						{navTree.map((nav, index) => {

							var children = nav.children;
							if (children.length == 0) {
								return (
									<Link
										key={index}
										to={`/${nav.value}`}
										className={`${currentLocation == "/" + nav.value
											? "bg-amazon-600 text-white"
											: "bg-white"
											} hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`}>
										<span className="">{nav.icon}</span>{" "}
										<span
										// className={`${navToggle ? "hidden" : "hidden md:block"}`}
										>
											{nav.label}
										</span>
									</Link>
								);
							}


							if (children.length > 0) {



								return (

									<div className="">

										<ToggleContent isOpen={false} labelIcon={nav.icon} iconPosition={`right`} title={nav.label} headerClass={`hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`} headerTitleClass={``} contentClass={` `}>

											<div className="ml-2 pl-2 border-l-2 border-gray-500">

												{children.map((nav, index) => {
													return (

														<Link
															key={index}
															to={`/${nav.value}`}
															className={`${currentLocation == "/" + nav.value
																? "bg-amazon-600 text-white"
																: "bg-white"
																} hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`}>
															<span className="">{nav.icon}</span>{" "}
															<span
															// className={`${navToggle ? "hidden" : "hidden md:block"}`}
															>
																{nav.label}
															</span>
														</Link>

													)
												})}
											</div>

										</ToggleContent>













									</div>

								);
							}








						})}

						{/* <div
							onClick={() => setnavToggle(!navToggle)}
							className="px-4 py-2 hidden md:block w-full cursor-pointer rounded-sm  text-gray-500 hover:text-white hover:bg-amazon-600">
							{navToggle ? (
								<IconLayoutSidebarRightCollapse />
							) : (
								<IconLayoutSidebarLeftCollapse />
							)}
						</div> */}
					</div>
				</>
			) : (
				<div className="flex flex-col">
					<a
						href={`/dashboard`}
						className={`bg-amazon-600 text-white  hover:bg-amazon-600 hover:text-white mb-2 rounded-sm   border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2 `}>
						{t("Dashboard")}
					</a>
				</div>
			)}
			<div>
				<Accounts />
			</div>
		</aside>
	);
};

export default Sidebar;
