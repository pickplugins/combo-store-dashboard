import { useState, useEffect, useContext } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AuthContext } from "../../components/AuthContext";
import { IconSettings, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconCopy, IconBrandOpenai } from "@tabler/icons-react";
import { useCounterStore } from '../../store/useCounterStore'

const PlaceholderEditor = (props) => {

	var content = props?.content
	var onChange = props?.onChange
	const { notifications, addNotification } = useCounterStore()


	const [isOpen, setIsOpen] = useState(false);
	var [placeholders, setplaceholders] = useState([]);
	var [customizedPrompts, setcustomizedPrompts] = useState(content);

	const { token, t } = useContext(AuthContext);

	useEffect(() => {

		extractPlaceholders(content)

	}, [content]);

	useEffect(() => {



		const result = content?.replace(/\[([^\]]+)\]/g, (match, key) => {
			return placeholders[key]?.value || match; // keep placeholder if no value
		});
		setcustomizedPrompts(result)

		if (onChange) {
			onChange(result)

		}

	}, [placeholders]);

	function run_prompt_on(site, prompt) {


		if (!token) {

			addNotification({ type: 'error', title: 'Login Required', content: "Please Login to run prompt" })

			throw new Error("No token found");
		}

		const encodedPrompt = encodeURIComponent(prompt);

		if (site == 'chatgpt') {
			var chatUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
		}
		if (site == 'gemini') {
			var chatUrl = `https://gemini.google.com/?q=${encodedPrompt}`;
		}
		if (site == 'perplexity') {
			var chatUrl = `https://www.perplexity.ai/search/?q=${encodedPrompt}`;
		}
		if (site == 'huggingchat') {
			var chatUrl = `https://huggingface.co/chat?q=${encodedPrompt}`;
		}
		if (site == 'xai') {
			var chatUrl = `https://grok.com?q=${encodedPrompt}`;
		}
		if (site == 'copilot') {
			var chatUrl = `https://copilot.microsoft.com/?q=${encodedPrompt}`;
		}
		if (site == 'poe') {
			var chatUrl = `https://poe.com?q=${encodedPrompt}`;
		}



		window.open(chatUrl, '_blank');

	}

	var runToSites = [
		{ label: "Chat GPT", value: "chatgpt" },
		{ label: "Google Gemini", value: "gemini" },
		{ label: "Perplexity AI", value: "perplexity" },
		{ label: "HuggingChat ", value: "huggingchat " },
		{ label: "X.AI", value: "xai" },
		{ label: "Microsoft Copilot", value: "copilot" },
		{ label: "Poe (by Quora)", value: "poe" },
		{ label: "Ideogram", value: "ideogram" },
		{ label: "reve", value: "reve" },
		{ label: "picsart", value: "picsart" },
		{ label: "firefly.adobe.com", value: "firefly.adobe.com" },
		{ label: "fotor", value: "fotor" },
		{ label: "recraft", value: "recraft" },
		{ label: "akool", value: "akool" },
		{ label: "gencraft", value: "gencraft" },
		{ label: "magichour", value: "magichour" },
		{ label: "veed.io", value: "veed" },
	]

	const copyData = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
			})
			.catch((err) => { });
	};

	function extractPlaceholders(content) {
		const matches = [...content?.matchAll(/\[([^\]]+)\]/g)];

		// Build JSON object
		const result = {};
		matches.forEach(match => {
			result[match[1]] = { value: "" };
		});
		setplaceholders(result)

	}


	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 bg-gray-800 text-gray-200 rounded-sm">

			<div className="">
				<div className="flex gap-4 flex-wrap items-center justify-between mb-5">


					<div className="text-xl">{t("Original Prompt")}</div>

					<div className="flex flex-wrap gap-3">




						<div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" onClick={() => {
							if (!token) {

								addNotification({ type: 'error', title: 'Login Required', content: "Please Login to copy prompt" })

								throw new Error("No token found");
							}
							copyData(content);
							addNotification({ type: 'success', title: 'Coppied', content: "Prompt Coppied Successful." })
						}}>
							<IconCopy width={20} />
							<span>{t("Copy")}</span>
						</div>
						<div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" >
							<IconBrandOpenai width={20} />

							<select name="" id="" className="!border-0 !shadow-none" onChange={ev => {
								var value = ev.target.value;
								run_prompt_on(value, content);

							}}>
								<option value="">{t("Run on")}</option>
								{runToSites.map((item, index) => {

									return (<option value={item.value} key={index}>{item.label}</option>)
								})}


							</select>

						</div>

					</div>


				</div>
				<div className="bg-gray-700 p-4 text-left rounded-sm h-48 overflow-y-scroll">{content}</div>


				<div className="flex gap-4 flex-wrap my-5 items-center justify-between mb-5">


					<div className="flex gap-3">

						<div className="text-xl">{t("Customized")}</div>

					</div>
					<div className="flex flex-wrap gap-3">
						<div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" onClick={() => {
							if (!token) {

								addNotification({ type: 'error', title: 'Login Required', content: "Please Login to copy prompt" })

								throw new Error("No token found");
							}

							copyData(customizedPrompts);
							addNotification({ type: 'success', title: 'Coppied', content: "Prompt Coppied Successful." })
						}}>
							<IconCopy width={20} />
							<span>{t("Copy")}</span>
						</div>
						<div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" >
							<IconBrandOpenai width={20} />
							<select name="" id="" className="!border-0 !shadow-none" onChange={ev => {
								var value = ev.target.value;
								run_prompt_on(value, content);

							}}>
								<option value="">{t("Run on")}</option>
								{runToSites.map(item => {

									return (<option key={item.value} value={item.value}>{item.label}</option>)
								})}


							</select>
						</div>

					</div>


				</div>

				<div className="bg-gray-700  p-2 text-left rounded-sm">
					<textarea name="" id="" className="h-48 border-none !shadow-none w-full !text-gray-200" value={customizedPrompts} onChange={ev => { }}>
						{customizedPrompts}
					</textarea>
				</div>

				{/* {JSON.stringify(placeholders)} */}

			</div>
			<div className="">

				<div className=" flex flex-col gap-5">
					{Object.entries(placeholders).length > 0 && (
						<div className="text-xl text-left">{t("Placeholders")}</div>
					)}
					{Object.entries(placeholders).length == 0 && (
						<div>{t("No Placeholder Found.")}</div>
					)}

					{Object.entries(placeholders).map(args => {

						var index = args[0]
						var item = args[1]


						return (
							<div className="flex flex-col gap-3 text-left" key={index}>
								<label htmlFor="">{index}</label>
								<input type="text" value={item.value} onChange={ev => {

									var value = ev.target.value;

									var placeholdersX = { ...placeholders }

									placeholdersX[index].value = value
									setplaceholders(placeholdersX)


								}} />
							</div>
						)

					})}





				</div>

			</div>

		</div>
	);
};

export default PlaceholderEditor;
