import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconEyeSearch, IconExclamationCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useCounterStore } from '../../store/useCounterStore'
import StarRating from "./StarRating";

const CommentsForm = ({ id, dummyComments, postData, parentId, commentSubmitted }) => {

	const { t, userData, token } = useContext(AuthContext);
	const { notifications, addNotification, userDataX, setUserDataX } = useCounterStore()




	const [comment, setcomment] = useState({ content: "", postId: id, parentId: parentId, rate: null });
	var [errors, seterrors] = useState([]);
	var [loading, setloading] = useState(false);

	var [submission, setsubmission] = useState({ id: null, success: false });



	function getRandomComments(arr, count = 10) {
		const shuffled = arr?.sort(() => 0.5 - Math.random());
		return shuffled?.slice(0, count);
	}

	// Usage
	const randomComments = getRandomComments(dummyComments);


	function submit_comment() {
		const token = localStorage.getItem("token");




		if (!token) {
			addNotification({ type: 'error', title: 'Login Required', content: "Please Login to submit comment." })

			seterrors(["Please login first. "])

			throw new Error("No token found");
		}




		if (comment.content.length == 0) {
			seterrors(["Comment Should not empty"])
			throw new Error("Comment Should not empty");

			return;
		}



		var bodyData = JSON.stringify(comment);




		setloading(true);
		fetch(
			appData.serverUrl + "wp-json/promptshub/v2/submit_comment",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: bodyData,
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
						var commentData = res?.comment;
						var message = res?.message;






						if (errors) {
							seterrors(errors)


							addNotification({ type: 'error', title: 'There is an error.', content: message })
							setloading(false);
							return;
						}
						if (success) {
							seterrors([])
							commentSubmitted(commentData)

							setsubmission({ ...submission, success: true })
							setcomment({ ...comment, content: "", rate: null });

							addNotification({ type: 'success', title: 'Thank you for your comment', content: "Your feedback is percious to us, Keep up good works." })

							var total_credit = parseInt(userDataX.total_credit) + 5
							setUserDataX({ ...userDataX, total_credit: total_credit });



						}




						setloading(false);

					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function onChangeCommentRate(rate) {

		setcomment({ ...comment, rate: rate });

	}



	return (
		<div className="">

			<div className="flex flex-col gap-5">

				{postData?.purchased && (
					<div className="flex flex-col gap-3">
						<label htmlFor="" className="block ">
							{t("Rate this prompt")}
						</label>
						<StarRating rate={comment.rate} onChange={onChangeCommentRate} />
					</div>
				)}


				<div className="flex flex-col gap-3">
					<label htmlFor="" className="block ">
						{t("Write Comment")}
					</label>
					<textarea
						className="!shadow-none h-40 bg-gray-700 !border-2 border-gray-600 px-2 py-1 rounded-sm w-full "
						value={comment?.content}
						onChange={(ev) => {
							var value = ev.target.value;
							setcomment({ ...comment, content: value });
						}}
					/>
				</div>

				<div className="flex flex-wrap gap-2 text-xs">

					{/* {JSON.stringify(randomComments)} */}


					{randomComments?.map((item, index) => {

						return (
							<div key={index} className="border rounded-full border-gray-600 px-2 py-1 cursor-pointer hover:bg-gray-500" onClick={ev => {

								setcomment({ ...comment, content: item });

							}}>{item}</div>
						)

					})}

				</div>

				<div className="p-2 text-center hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
					onClick={ev => {
						submit_comment()
					}}

				>




					{!loading && (
						<>{t("Submit")}</>
					)}
					{loading && (
						<> {t("Please wait.")}</>
					)}


				</div>

				{errors?.length > 0 && (
					<div className="text-red-400 text-sm">
						{errors?.map((item, index) => {

							return (
								<div key={index} className="flex items-center gap-2"> <IconExclamationCircle /> {item}</div>
							)
						})}
					</div>
				)}



			</div>

		</div>
	);
};

export default CommentsForm;
