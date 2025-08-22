import { useState, useEffect, useContext } from "react";
import { IconRefresh, IconEraser } from "@tabler/icons-react";
import { AuthContext } from "../../components/AuthContext";

const PromptsPicker = (props) => {
	var title = props.title;
	var onPick = props.onPick;
	const { token, t } = useContext(AuthContext);


	const [isOpen, setIsOpen] = useState(false);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, });
	var [loading, setloading] = useState(false);
	var [prompts, setprompts] = useState(null);


	function fetchPosts() {

		const token = localStorage.getItem("token");




		if (queryPrams.page < 0) {
			return;
		}
		if (queryPrams.keyword.length < 3) {
			return;
		}

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/promptshub/v2/get_prompts", {
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

						setprompts({ posts: posts, total: total, maxPages: max_pages })
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
	}, []);
	useEffect(() => {
		if (queryPrams.keyword.length > 3) {
			fetchPosts();
		}
		if (queryPrams.keyword.length == 0) {
			setprompts([]);
		}
	}, [queryPrams.keyword]);


	return (
		<div className="flex items-center gap-2">

			<div>
				<input
					type="text"
					className="!shadow-none bg-gray-800 px-2 py-1 rounded-sm w-full !border-2 border-gray-600"
					value={queryPrams.keyword}
					placeholder={t("Search")}
					onChange={(ev) => {
						var value = ev.target.value;
						// setcurrentObject({ ...currentObject, title: value });

						setqueryPrams({ ...queryPrams, keyword: value })
					}}
				/>

				{prompts?.posts?.length > 0 && (
					<>
						<div className="relative">

							<div className="absolute top-0 left-0 w-full bg-white p-2 shadow-sm">
								{prompts?.posts.map(item => {
									return (
										<div className="border-b border-solid border-indigo-600 hover:bg-gray-300 px-2 py-1 cursor-pointer"
											onClick={ev => {
												onPick(item)
											}}
										>{item.title}</div>
									)
								})}
							</div>

						</div>
					</>
				)}

			</div>



			<div>
				{loading && (
					<div className="animate-spin "><IconRefresh /></div>

				)}
				{!loading && (
					<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-2 py-2 bg-gray-600 text-white" onClick={ev => {
						setqueryPrams({ ...queryPrams, keyword: "" })

					}}><IconEraser /></div>

				)}

			</div>


		</div>
	);
};

export default PromptsPicker;
