import { useState, useEffect } from "react";
import { IconRefresh, IconEraser, IconX, IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed } from "@tabler/icons-react";
import Popover from "../Popover";
import { Helmet } from 'react-helmet';

const OpenGraphPromts = (props) => {

	var id = props.id;
	var logo = props.logo;
	var title = props.title;
	var url = props.url;
	var description = props.description;
	var image = props.image;
	var ratingValue = props.ratingValue;
	var ratingCount = props.ratingCount;
	var reviewCount = props.reviewCount;


	const [isOpen, setIsOpen] = useState(false);



	useEffect(() => {

	}, []);

	const schemaData = {
		"@context": "http://schema.org",
		"@type": "Product",
		"name": title,
		"image": image,
		"description": description,
		"aggregateRating": {
			"@type": "AggregateRating",
			"worstRating": 1,
			"bestRating": 5,
			"ratingValue": ratingValue,
			"ratingCount": ratingCount,
			"reviewCount": reviewCount
		}
	};

	return (
		<Helmet>
			<title>{title}</title>
			{description && (
				<meta name="description" content={description} />
			)}
			{title && (
				<meta property="og:title" content={title} />
			)}

			{description && (
				<meta property="og:description" content={description} />
			)}


			{image && (
				<meta property="og:image" content={image} />
			)}
			{url && (
				<meta property="og:url" content={url} />

			)}
			{logo && (
				<meta property="og:logo" content={logo} />

			)}

			<meta property="og:type" content="product" />


			<script type="application/ld+json">
				{JSON.stringify(schemaData)}
			</script>


		</Helmet>
	);
};

export default OpenGraphPromts;
