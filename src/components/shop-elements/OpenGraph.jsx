import { useState, useEffect } from "react";
import { IconRefresh, IconEraser, IconX, IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed } from "@tabler/icons-react";
import Popover from "../Popover";
import { Helmet } from 'react-helmet';

const OpenGraph = (props) => {

	var OpenGraphData = props?.OpenGraphData;


	var id = props?.id ? props?.id : OpenGraphData?.id;
	var url = props?.url ? props?.url : OpenGraphData?.url;
	var keywords = props?.keywords ? props?.keywords : OpenGraphData?.keywords;
	var title = props?.title ? props?.title : OpenGraphData?.title;
	var description = props?.description ? props?.description : OpenGraphData?.description;
	var image = props?.image ? props?.image : OpenGraphData?.image;
	var robots = props?.robots ? props?.robots : OpenGraphData?.robots;


	// const [isOpen, setIsOpen] = useState(false);



	// useEffect(() => {

	// }, []);

	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Place",
				"@id": "https://promptshub.net/#place",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "House: 145, Road: 01",
					"addressLocality": "New Shalbon",
					"addressRegion": "Rangpur",
					"postalCode": "5460",
					"addressCountry": "Bangladesh"
				}
			},
			{
				"@type": "Organization",
				"@id": "https://promptshub.net/#organization",
				"name": "PromptsHub",
				"url": "https://promptshub.net",
				"sameAs": [
					"https://facebook.com/PromptsHub/",
					"https://twitter.com/PromptsHub/"
				],
				"email": "contact@promptshub.net",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "House: 145, Road: 01",
					"addressLocality": "New Shalbon",
					"addressRegion": "Rangpur",
					"postalCode": "5460",
					"addressCountry": "Bangladesh"
				},
				"logo": {
					"@type": "ImageObject",
					"@id": "https://promptshub.net/#logo",
					"url": "https://promptshub.net/images/promptshub-icon.jpg",
					"contentUrl": "https://promptshub.net/images/promptshub-icon.jpg",
					"caption": "PromptsHub",
					"inLanguage": "en-US",
					"width": "300",
					"height": "80"
				},
				"contactPoint": [
					{
						"@type": "ContactPoint",
						"telephone": "+8801537034053",
						"contactType": "customer support"
					}
				],
				"location": {
					"@id": "https://promptshub.net/#place"
				}
			},
			{
				"@type": "WebSite",
				"@id": "https://promptshub.net/#website",
				"url": "https://promptshub.net",
				"name": "PromptsHub",
				"publisher": {
					"@id": "https://promptshub.net/#organization"
				},
				"inLanguage": "en-US"
			},
			{
				"@type": "WebPage",
				"@id": url + "#webpage",
				"url": url,
				"name": title,
				"datePublished": "2015-08-06T19:18:26+06:00",
				"dateModified": "2025-01-22T17:14:37+06:00",
				"isPartOf": {
					"@id": "https://promptshub.net/#website"
				},
				"inLanguage": "en-US"

			},
			{
				"@type": "Person",
				"@id": "https://promptshub.net/author/promptshub/",
				"name": "PromptsHub",
				"description": "Creative AI prompt engineer on PromptsHub, specializing in crafting optimized, role-based prompts for ChatGPT, Midjourney, and other LLM platforms.",
				"url": "https://promptshub.net/author/promptshub/",
				"image": {
					"@type": "ImageObject",
					"@id": "https://promptshub.net/wp-content/litespeed/avatar/d38ca42d4f45383da7db03ffba0e0db9.jpg?ver=1752803893",
					"url": "https://promptshub.net/wp-content/litespeed/avatar/d38ca42d4f45383da7db03ffba0e0db9.jpg?ver=1752803893",
					"caption": "PromptsHub",
					"inLanguage": "en-US"
				},
				"sameAs": [
					"https://promptshub.net"
				],
				"worksFor": {
					"@id": "https://promptshub.net/#organization"
				}
			},
			{
				"@type": "Article",
				"headline": title,
				"keywords": keywords,
				"datePublished": "2015-08-06T19:18:26+06:00",
				"dateModified": "2025-01-22T17:14:37+06:00",
				"author": {
					"@id": "https://promptshub.net/author/promptshub/",
					"name": "PromptsHub"
				},
				"publisher": {
					"@id": "https://promptshub.net/#organization"
				},
				"description": description,
				"name": title,
				"@id": url + "#richSnippet",
				"isPartOf": {
					"@id": url + "#webpage"
				},
				"inLanguage": "en-US",
				"mainEntityOfPage": {
					"@id": url + "#webpage"
				}
			}
		]
	};

	return (
		<Helmet>
			<title>{title}</title>
			{description && (
				<meta name="description" content={description} />
			)}
			{description && (
				<meta property="og:description" content={description} />
			)}
			{title && (
				<meta property="og:title" content={title} />
			)}
			{image && (
				<meta property="og:image" content={image} />
			)}
			{robots && (
				<meta name="robots" content={robots} />

			)}

			<script type="application/ld+json">
				{JSON.stringify(schemaData)}
			</script>


		</Helmet>
	);
};

export default OpenGraph;
