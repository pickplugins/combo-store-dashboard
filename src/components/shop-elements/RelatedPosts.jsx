import { useState, useEffect, useContext } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

const RelatedPosts = (props) => {

	var categories = props.categories;
	var postId = props.postId;




	const [isOpen, setIsOpen] = useState(false);
	var [loading, setloading] = useState(false);

	var queryPramsDefault = { category: "", post__not_in: postId, categories: categories, keyword: "", paged: 1, order: "DESC", per_page: 8, };

	var dymmyPromots = []

	var [queryPrams, setqueryPrams] = useState(queryPramsDefault);
	var [promptsData, setpromptsData] = useState({ posts: dymmyPromots, total: 8, maxPages: 1 });



	function fetchPosts() {

		const token = localStorage.getItem("token");

		// if (!token) {
		// 	throw new Error("No token found");
		// }


		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			paged: queryPrams.paged,
			order: queryPrams.order,
			keyword: queryPrams.keyword,
			category: queryPrams.category,
			categories: queryPrams.categories,
			post__not_in: queryPrams.post__not_in,
		};



		postData = JSON.stringify(postData);





		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_products", {
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





						setpromptsData({ posts: posts, total: total, maxPages: max_pages })
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


	return (
		<div className="pb-5 w-full grid grid-cols-1 xl:grid-cols-4 gap-5">


			{promptsData?.posts.map((entry, index) => {


				return (



					<div className="  bg-gray-600 rounded-sm p-5 flex flex-col gap-2" key={index}>

						{entry?.post_thumbnail_url && (
							<Link className="text-left flex flex-col gap-2  cursor-pointer" to={`/product/${entry.id}/`} >
								<div className="h-[200px] overflow-hidden">
									<img className="h-full w-full object-cover" src={entry?.post_thumbnail_url} alt={entry?.title} />

								</div>
								<div className="text-gray-200 text-lg ">
									{entry?.title}
								</div>

							</Link>

						)}
						{!entry?.post_thumbnail_url && (
							<Link className="text-left   cursor-pointer" to={`/product/${entry.id}/`} >
								<div className="h-[200px] overflow-hidden">
									<img className=" opacity-20 h-full w-full object-cover" src={`${appData.appUrl}images/product-thumb.png`} alt={entry?.title} />

								</div>


							</Link>

						)}





						<div className="text-gray-200 ">

							{entry?.categories.length > 0 && (
								<div className="flex items-center text-sm gap-2 flex-wrap">

									<div>
										<IconTags width={18} />
									</div>

									{entry?.categories.map((item, index) => {

										return (
											<div key={index}>
												<span>{item.name}</span>
												{entry?.categories.length > (index + 1) && (
													<span className="pr-1">, </span>
												)}
											</div>
										)

									})}
								</div>

							)}

						</div>



					</div>


				)
			})}







		</div>
	);
};

export default RelatedPosts;
