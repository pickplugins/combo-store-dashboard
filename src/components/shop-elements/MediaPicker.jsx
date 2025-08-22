import { useState, useEffect, useContext, useRef } from "react";
import { IconRefresh, IconEraser, IconX, IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed } from "@tabler/icons-react";
import Popover from "../Popover";
import { AuthContext } from "../../components/AuthContext";

const MediaPicker = (props) => {
	var popupClass = props.popupClass;
	var title = props.title;
	var onPick = props.onPick;

	const { token, t } = useContext(AuthContext);

	const [isOpen, setIsOpen] = useState(false);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", per_page: 4, });
	var [loading, setloading] = useState(false);
	var [products, setproducts] = useState({ posts: [] });
	var [mediaLibrary, setmediaLibrary] = useState({ enable: false, });

	const scrollRef = useRef(null);

	function fetchPosts(prams) {

		var reset = prams?.reset;

		const token = localStorage.getItem("token");


		if (mediaLibrary.forceRefresh) {

		} else {
			if (queryPrams.page < 0) {
				return;
			}
			if (queryPrams.keyword.length < 3) {
				//return;
			}
		}



		var postData = {
			keyword: queryPrams.keyword,
			per_page: queryPrams.per_page,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/promptshub/v2/get_medias", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${token}`
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

						// 
						// 

						if (reset) {
							var postsX = posts
						} else {
							var postsX = [...products.posts, ...posts]
						}


						setproducts({ posts: postsX, total: total, maxPages: max_pages })
						//setqueryPrams({ ...queryPrams, loading: false })
						setloading(false);


						setTimeout(() => {
							handleScrollToBottom()
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
	}, []);




	useEffect(() => {
		fetchPosts();

	}, [queryPrams.page]);


	useEffect(() => {
		if (queryPrams.keyword.length > 3) {
			fetchPosts({ reset: true });
		}
		if (queryPrams.keyword.length == 0) {
			fetchPosts({ reset: true });
		}
	}, [queryPrams.keyword]);

	const handleScrollToBottom = () => {
		const div = scrollRef.current;
		if (div) {
			div.scrollTo({
				top: div.scrollHeight,
				behavior: 'smooth', // or 'auto'
			});
		}
	};


	return (
		<div className="flex items-center gap-2">

			<div className="relative">

				<div className=" bg-white overflow-hidden rounder-sm  shadow-lg">


					<div className="flex gap-2 flex-wrap items-center justify-between p-3">

						<div className="flex gap-2 items-center ">
							<input
								type="text"
								className="border border-gray-600 border-solid px-2 py-1 rounded-sm  bg-white"
								value={queryPrams.keyword}
								placeholder={t("Search")}
								onChange={(ev) => {
									var value = ev.target.value;
									// setcurrentObject({ ...currentObject, title: value });

									setqueryPrams({ ...queryPrams, keyword: value })
								}}
							/>


							{!loading && (
								<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-2 py-2 bg-gray-600 text-white" onClick={ev => {
									setqueryPrams({ ...queryPrams, keyword: "" })

								}}><IconEraser /></div>

							)}


							<div className="hover:bg-gray-400 rounded-sm cursor-pointer px-2 py-2 bg-gray-600 text-white">
								{loading && (
									<div className="animate-spin "><IconRefresh /></div>

								)}
								{!loading && (
									<div className=" " onClick={ev => {

										fetchPosts({ reset: true });
									}}><IconRefresh /></div>

								)}
							</div>




						</div>

						<div className="flex gap-2  justify-between">
							<div className="flex gap-2">
								<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-4 py-1 bg-gray-600 text-white" onClick={ev => {
									var value = parseInt(queryPrams.page);

									value = (value > 1) ? value - 1 : 1;



									setqueryPrams({ ...queryPrams, page: value })
								}}>
									<IconArrowNarrowLeftDashed />
								</div>
								<div><input type="text" name="" id="" value={queryPrams.page} className="w-16  rounded-sm cursor-pointer px-2 py-1 border-2 border-solid border-gray-600 text-center" onChange={(ev) => {
									var value = parseInt(ev.target.value);



									setqueryPrams({ ...queryPrams, page: value })
								}} /></div>
								<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-4 py-1 bg-gray-600 text-white" onClick={ev => {
									var value = parseInt(queryPrams.page) + 1;


									setqueryPrams({ ...queryPrams, page: value })
								}}>
									<IconArrowNarrowRightDashed />
								</div>

							</div>




						</div>


					</div>



					{products?.posts?.length > 0 && (
						<>
							<div ref={scrollRef} className="relative pt-2 overflow-y-scroll h-[450px]">



								<div className=" w-full">



									<div className="grid xl:grid-cols-4 grid-cols-2 gap-3 p-3">
										{products?.posts.map((item, index) => {
											return (
												<div key={index} className="relative  border-2 border-solid border-gray-600 cursor-pointer"
													onClick={ev => {
														onPick(item)
													}}
												>
													<img className="w-full object-cover h-full" src={item.src} alt="" />
													<div className="absolute text-sm bottom-0 left-0 w-full bg-gray-500 p-2 text-white bg-opacity-60">
														{item.title}
													</div>
												</div>
											)
										})}
									</div>
								</div>

							</div>
						</>
					)}


					<div className="flex justify-center py-2">

						<div className="flex text-sm gap-2 hover:bg-gray-400 rounded-sm cursor-pointer px-3 py-2 bg-gray-600 text-white">
							<div onClick={ev => {

								var value = parseInt(queryPrams.page) + 1;


								setqueryPrams({ ...queryPrams, page: value })




								// fetchPosts();
							}}>Load More</div>

							{loading && (
								<div className="animate-spin " ><IconRefresh /></div>
							)}

						</div>

					</div>

				</div>

			</div>




		</div>
	);
};

export default MediaPicker;
