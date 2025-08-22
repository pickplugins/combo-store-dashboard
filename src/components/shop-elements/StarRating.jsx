import { useState, useEffect, useContext } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import { IconStar, IconStarFilled, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

const StarRating = (props) => {

	var categories = props.categories;
	var onChange = props.onChange;
	var rate = props.rate;




	const [starIndex, setstarIndex] = useState(rate);




	var stars = [
		{ label: "Very Poor", value: 1 },
		{ label: "Poor", value: 2 },
		{ label: "Normal", value: 3 },
		{ label: "Good", value: 4 },
		{ label: "Supper", value: 5 },
	]



	useEffect(() => {

		onChange(starIndex)
	}, [starIndex]);
	useEffect(() => {

		setstarIndex(rate)
	}, [rate]);


	return (
		<div className="flex gap-1 items-center" >


			{stars.map((item, index) => {

				return (

					<div onMouseOver={ev => {
						setstarIndex(index + 1)
					}}
						key={index}

						title={item?.label} className="cursor-pointer">


						{starIndex <= index && (
							<><IconStar /></>
						)}
						{starIndex > index && (
							<><IconStarFilled /></>
						)}



					</div>
				)

			})}

			{starIndex > 0 && (
				<div className="text-red-400 pl-5 cursor-pointer" onClick={ev => {

					setstarIndex(null)

				}}>Reset</div>
			)}


		</div>
	);
};

export default StarRating;
