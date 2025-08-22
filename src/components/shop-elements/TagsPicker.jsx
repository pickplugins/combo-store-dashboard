import { useState, useEffect } from "react";
import { IconRefresh, IconEraser } from "@tabler/icons-react";

const TagsPicker = (props) => {
	var taxonomy = props.taxonomy;
	var title = props.title;
	var onPick = props.onPick;


	const [isOpen, setIsOpen] = useState(false);
	var [queryPrams, setqueryPrams] = useState({ taxonomy: taxonomy, keyword: "", page: 1, order: "DESC", limit: 10, });
	var [loading, setloading] = useState(false);
	var [terms, setterms] = useState(null);




	function fetchTerms() {

		const token = localStorage.getItem("token");

		if (queryPrams.page < 0) {
			return;
		}
		if (queryPrams.keyword.length < 3) {
			return;
		}

		var postData = {
			taxonomy: queryPrams.taxonomy,
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_terms", {
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

						var terms = res?.terms;
						var total = res?.total;
						var max_pages = res?.max_pages;

						var termsX = [];

						Object.entries(terms).map(args => {
							var index = args[0]
							var item = args[1]
							termsX.push(item)
						})


						setterms(termsX)
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

		fetchTerms();
	}, []);
	useEffect(() => {
		if (queryPrams.keyword.length > 3) {
			fetchTerms();
		}
		if (queryPrams.keyword.length == 0) {
			setterms([]);
		}
	}, [queryPrams.keyword]);


	return (
		<div className="flex items-center gap-2">

			<div>
				<input
					type="text"
					className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
					value={queryPrams.keyword}
					placeholder="Search..."
					onChange={(ev) => {
						var value = ev.target.value;
						setqueryPrams({ ...queryPrams, keyword: value })
					}}
				/>

				{/* {JSON.stringify(terms)} */}

				{terms?.length > 0 && (
					<>
						<div className="relative">

							<div className="absolute top-0 left-0 w-full bg-white p-2 shadow-sm">
								{terms?.map(item => {
									return (
										<div className="border-b border-solid border-gray-400 hover:bg-gray-300 px-2 py-1 cursor-pointer"
											onClick={ev => {
												onPick(item)
											}}
										>{item.name}</div>
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

export default TagsPicker;
