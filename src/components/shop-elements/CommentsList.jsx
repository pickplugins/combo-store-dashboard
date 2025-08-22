import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import CommentsForm from "./CommentsForm";
import { IconStar, IconStarFilled, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

const CommentsList = ({ comments, id, commentSubmitted }) => {

	const { t, userData } = useContext(AuthContext);




	const [loading, setloading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [replyTo, setreplyTo] = useState({ index: null });






	const CommentTemplate = ({ comment, index, id, commentSubmitted }) => {


		var comment_parent = comment?.comment_parent;

		var stars = [
			{ label: "Very Poor", value: 1 },
			{ label: "Poor", value: 2 },
			{ label: "Normal", value: 3 },
			{ label: "Good", value: 4 },
			{ label: "Supper", value: 5 },
		]


		return (
			<div className={`${comment_parent > 0 ? "ml-7" : ""} bg-gray-700 rounded-sm p-3 `}>

				<div className="flex gap-4 flex-col  ">

					<div className="flex justify-between items-center">

						<div className="w-max flex gap-2 items-center ">
							<div className="w-[40px] h-[40px] rounded-full overflow-hidden">
								<img className="w-full h-full object-cover" src={comment?.avatar} alt={comment?.comment_author} /></div>
							<div className="text-sm w-max ">{comment?.comment_author}</div>
						</div>
						<div>
							{comment.rate > 0 && (
								<div>
									<div className="flex gap-1 items-center" >

										<div>Rate: </div>

										{stars.map((item, index) => {

											return (

												<div
													title={item?.label} className=" text-amber-400" key={index}>


													{comment.rate <= index && (
														<><IconStar width={18} /></>
													)}
													{comment.rate > index && (
														<><IconStarFilled width={18} /></>
													)}



												</div>
											)

										})}




									</div>
								</div>

							)}
						</div>
					</div>




					<div className=" w-full text-sm ">
						{comment?.comment_content}
					</div>

					<div className="flex justify-end gap-2 text-sm w-full">

						<div className="cursor-pointer" onClick={ev => {

							setreplyTo({ ...replyTo, index: index })

						}}>Reply</div>

						{replyTo.index == index && (
							<div className="cursor-pointer text-red-400" onClick={ev => {

								setreplyTo({ ...replyTo, index: null })

							}}>Cancel</div>
						)}


					</div>

					{replyTo.index == index && (

						<div className="w-full">
							<CommentsForm id={id} parentId={comment.comment_ID} commentSubmitted={commentSubmitted} />
						</div>
					)}


				</div>

			</div>
		);
	};



	return (
		<div className="">


			<div className="flex flex-col gap-5 max-h-[600px] overflow-auto">
				{comments?.map((comment, index) => {

					return (
						<CommentTemplate key={index} comment={comment} id={id} commentSubmitted={commentSubmitted} index={index} />

					)

				})}
			</div>


		</div>
	);
};

export default CommentsList;
