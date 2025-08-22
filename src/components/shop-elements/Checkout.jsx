import { useState, useEffect, useContext } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconTrash, IconBasketCheck, IconChevronUp, IconChevronDown, IconX, IconShoppingCartCancel, IconSquare, IconSquareCheck } from "@tabler/icons-react";

import CartItems from "./CartItems";
import { useCounterStore } from '../../store/useCounterStore'
import ToggleContent from "../ToggleContent";


const Checkout = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [cartToggle, setcartToggle] = useState(false);
	const [cartTotalQuantity, setcartTotalQuantity] = useState(0);
	const [cartTotalPay, setcartTotalPay] = useState(0);
	const [billing, setBilling] = useState({ firstName: "", lastName: "", company: "", address1: "", address2: "", country: "", city: "", phone: "", email: "" });
	const [shipping, setShipping] = useState({ firstName: "", lastName: "", company: "", address1: "", address2: "", country: "", city: "", phone: "", email: "" });

	const { notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()

	const [checkoutData, setcheckoutData] = useState({ paymentMethod: "", cartItems: [] });


	var paymentMethods = [
		{ label: "Cash on delivery", value: "COD", icon: "" },
		{ label: "Bkash", value: "bkash", icon: "" }
	]

	useEffect(() => {


	}, []);







	return (
		<div className="overflow-y-auto">

			<div className="p-4 flex flex-col gap-3">

				<div className="text-lg">Billing details</div>

				<div className="grid grid-cols-2 gap-5">

					<div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">First Name *</label>
							<input type="text" value={billing.firstName} placeholder="" onChange={ev => {
								var value = ev.target.value;
								setBilling({ ...billing, firstName: value })
							}} />
						</div>
					</div>
					<div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Last Name *</label>
							<input type="text" value={billing.lastName} placeholder="" onChange={ev => {
								var value = ev.target.value;
								setBilling({ ...billing, lastName: value })

							}} />
						</div>
					</div>

				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="">Company Name</label>
					<input type="text" value={billing.company} placeholder="" onChange={ev => {
						var value = ev.target.value;
						setBilling({ ...billing, company: value })

					}} />
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="">Address 1</label>
					<input type="text" value={billing.address1} placeholder="House number and street name" onChange={ev => {
						var value = ev.target.value;
						setBilling({ ...billing, address1: value })

					}} />
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="">Address 2</label>
					<input type="text" value={billing.address2} placeholder="Apartment, suite, unit, etc. (optional)" onChange={ev => {
						var value = ev.target.value;
						setBilling({ ...billing, address2: value })

					}} />
				</div>



				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<label htmlFor="">Country</label>
						<input type="text" value={billing.country} placeholder="" onChange={ev => {
							var value = ev.target.value;
							setBilling({ ...billing, country: value })

						}} />
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="">City</label>
						<input type="text" value={billing.city} placeholder="" onChange={ev => {
							var value = ev.target.value;
							setBilling({ ...billing, city: value })

						}} />
					</div>


				</div>
				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<label htmlFor="">Phone</label>
						<input type="text" value={billing.phone} placeholder="" onChange={ev => {
							var value = ev.target.value;
							setBilling({ ...billing, phone: value })

						}} />
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="">Email</label>
						<input type="text" value={billing.email} placeholder="" onChange={ev => {
							var value = ev.target.value;
							setBilling({ ...billing, email: value })

						}} />
					</div>


				</div>



			</div>

			<div className="px-4">
				<ToggleContent isOpen={false} labelIcon={``} iconPosition={`right`} title={"Ship to a different address?"} headerClass={`hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-500 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`} headerTitleClass={``} contentClass={`bg-white`}>
					<div className="p-4 flex flex-col gap-3">

						<div className="text-lg">Shipping details</div>

						<div className="grid grid-cols-2 gap-5">

							<div>
								<div className="flex flex-col gap-2">
									<label htmlFor="">First Name *</label>
									<input type="text" value={billing.firstName} placeholder="" onChange={ev => {
										var value = ev.target.value;
										setBilling({ ...billing, firstName: value })
									}} />
								</div>
							</div>
							<div>
								<div className="flex flex-col gap-2">
									<label htmlFor="">Last Name *</label>
									<input type="text" value={billing.lastName} placeholder="" onChange={ev => {
										var value = ev.target.value;
										setBilling({ ...billing, lastName: value })

									}} />
								</div>
							</div>

						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="">Company Name</label>
							<input type="text" value={shipping.company} placeholder="" onChange={ev => {
								var value = ev.target.value;
								setShipping({ ...shipping, company: value })

							}} />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Address 1</label>
							<input type="text" value={shipping.address1} placeholder="House number and street name" onChange={ev => {
								var value = ev.target.value;
								setShipping({ ...shipping, address1: value })

							}} />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Address 2</label>
							<input type="text" value={shipping.address2} placeholder="Apartment, suite, unit, etc. (optional)" onChange={ev => {
								var value = ev.target.value;
								setShipping({ ...shipping, address2: value })

							}} />
						</div>



						<div className="grid grid-cols-2 gap-5">
							<div className="flex flex-col gap-2">
								<label htmlFor="">Country</label>
								<input type="text" value={shipping.country} placeholder="" onChange={ev => {
									var value = ev.target.value;
									setShipping({ ...shipping, country: value })

								}} />
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="">City</label>
								<input type="text" value={shipping.city} placeholder="" onChange={ev => {
									var value = ev.target.value;
									setShipping({ ...shipping, city: value })

								}} />
							</div>


						</div>
						<div className="grid grid-cols-2 gap-5">
							<div className="flex flex-col gap-2">
								<label htmlFor="">Phone</label>
								<input type="text" value={shipping.phone} placeholder="" onChange={ev => {
									var value = ev.target.value;
									setShipping({ ...shipping, phone: value })

								}} />
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="">Email</label>
								<input type="text" value={shipping.email} placeholder="" onChange={ev => {
									var value = ev.target.value;
									setShipping({ ...shipping, email: value })

								}} />
							</div>


						</div>



					</div>
				</ToggleContent>
			</div>

			<div className="p-4 flex flex-col gap-4">
				<div className="text-lg">Payment Methods				</div>

				<div className="flex flex-col gap-2">
					{paymentMethods.map(method => {

						return (
							<div className="flex cursor-pointer gap-3" onClick={ev => {
								setcheckoutData({ ...checkoutData, paymentMethod: method.value })
							}}>
								<div>
									{checkoutData.paymentMethod == method.value && (
										<IconSquareCheck />
									)}
									{checkoutData.paymentMethod != method.value && (
										<IconSquare />
									)}


								</div>
								<div>{method.label}</div>

							</div>
						)

					})}
				</div>



				<div className="bg-blue-800 cursor-pointer py-3 px-4 text-center rounded-sm text-white">Pay ($253)</div>





			</div>







		</div>
	);
};

export default Checkout;
