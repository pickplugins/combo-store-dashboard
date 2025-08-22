import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import CommentsList from "./CommentsList";
import CommentsForm from "./CommentsForm";

const Comments = ({ id, postData, dummyComments }) => {

	const { t, userData } = useContext(AuthContext);



	const [loading, setloading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [comments, setcomments] = useState([]);

	function fetchComments() {




		const token = localStorage.getItem("token");

		// if (!token) {
		// 	throw new Error("No token found");
		// }

		var queryPrams = { post_id: id, paged: 1, order: "ASC", per_page: 20, }


		if (queryPrams.paged < 0) {
			return;
		}


		var postData = JSON.stringify(queryPrams);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/promptshub/v2/get_comments", {
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

						var comments = res?.comments;


						setcomments(comments)
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

		fetchComments();
	}, []);








	function fetchComments() {

		const token = localStorage.getItem("token");

		// if (!token) {
		// 	throw new Error("No token found");
		// }

		var queryPrams = { post_id: id, paged: 1, order: "ASC", per_page: 20, }


		if (queryPrams.paged < 0) {
			return;
		}


		var postData = JSON.stringify(queryPrams);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/promptshub/v2/get_comments", {
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

						// 


						var comments = res?.comments;
						setcomments(comments)
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

		fetchComments();
	}, []);

	function onCommentSubmitted(comment) {


		var commentsX = [...comments];
		commentsX.push(comment)
		setcomments(commentsX)

	}


	return (


		<div className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-10 bg-gray-800 text-gray-200 rounded-sm">

			<div className="rounded-sm overflow-hidden">
				<div className="text-2xl mb-5 text-white">{t("Comments")}({comments.length})</div>

				<CommentsList comments={comments} id={id} commentSubmitted={onCommentSubmitted} />

				{comments.length == 0 && (

					<div className="text-sm">No Comments Yet. Write First Comment.</div>
				)}

			</div>
			<div className="rounded-sm overflow-hidden">
				<div className="text-2xl mb-5 text-white">{t("Submit Comment")}</div>

				<CommentsForm postData={postData} dummyComments={dummyComments} id={id} commentSubmitted={onCommentSubmitted} />
			</div>
		</div>

	);
};

export default Comments;
