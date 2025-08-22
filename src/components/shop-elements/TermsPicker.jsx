import { useState, useEffect, useContext } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AuthContext } from "../../components/AuthContext";
import { IconSettings, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar } from "@tabler/icons-react";

const TermsPicker = (props) => {

	var selected = props.selected
	var onPick = props.onPick
	var taxonomy = props.taxonomy

	const [isOpen, setIsOpen] = useState(false);
	var [categories, setcategories] = useState([]);
	var [loading, setloading] = useState(false);

	const { token, t } = useContext(AuthContext);


	useEffect(() => {

		var postData = {
			taxonomy: taxonomy,
		};

		postData = JSON.stringify(postData);
		setloading(true);
		fetch(
			appData.serverUrl + "wp-json/combo-store/v2/get_terms",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: postData,
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
						var terms = res?.terms;


						setcategories(terms);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}, []);


	function TermsTree({ child, selected, onPick }) {



		return (
			<ul className="ml-4">
				{Object.entries(child)?.map(args => {
					var index = args[0]
					var item = args[1]

					// const exists = selected?.some(term => term.term_id === item.term_id);
					const exists = selected?.includes(item.term_id);  // true

					return (
						<li className="flex gap-2 items-center " key={item.name}>
							<div className="flex gap-2 items-center py-1 hover:bg-gray-300 cursor-pointer px-2 rounded-sm text-gray-400" onClick={ev => {
								onPick(item)
							}}>
								{exists && (
									<IconCheckbox />
								)}
								{!exists && (
									<IconSquare />
								)}
								{item.name}
							</div>


							{item?.children?.length > 0 && (
								<TermsTree child={item?.children} onPick={onPick} />
							)}

						</li>
					)
				})}
			</ul>
		)

	}


	return (
		<div className="">

			{/* <code>{JSON.stringify(categories)}</code> */}

			<ul>
				{Object.entries(categories)?.map(args => {

					var index = args[0]
					var item = args[1]

					// const exists = selected?.some(term => term.term_id === item.term_id);
					const exists = selected?.includes(item.term_id);  // true

					return (
						<li className=" " key={item.name}>
							<div className="flex gap-2 items-center py-1 hover:bg-gray-300 cursor-pointer px-2 rounded-sm text-gray-400" onClick={ev => {
								onPick(item)
							}}>

								{exists && (
									<IconCheckbox />
								)}
								{!exists && (
									<IconSquare />
								)}

								{item.name}
							</div>


							{item?.children && (
								<>

									<TermsTree child={item.children} selected={selected} onPick={onPick} />
								</>
							)}

						</li>
					)
				})}
			</ul>

		</div>
	);
};

export default TermsPicker;
