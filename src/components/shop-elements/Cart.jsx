import { useState, useEffect, useContext } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconTrash, IconBasketCheck, IconChevronUp, IconChevronDown, IconX, IconShoppingCartCancel, IconLetterX, IconCornerUpLeftDouble } from "@tabler/icons-react";

import CartItems from "./CartItems";
import Checkout from "./Checkout";
import { useCounterStore } from '../../store/useCounterStore'


const Cart = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [steps, setSteps] = useState(0);
	const [cartToggle, setcartToggle] = useState(false);
	const [cartTotalQuantity, setcartTotalQuantity] = useState(0);
	const [cartTotalPay, setcartTotalPay] = useState(0);

	const { notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	const [coupons, setcoupons] = useState({ applied: false, couponCode: "", discountAmount: 0, });
	// const [cartItems, setcartItems] = useState([
	// 	{ id: 123, title: "Fresh Happy Nappy Pant Diaper M (7- 12 kg)", quantity: 3, price: 123, oldPrice: 125, priceHtml: "", thumbnail: "http://localhost/wp/wp-content/uploads/2025/05/5-24-2025-11-25-05-AM.png" },
	// 	{ id: 124, title: "NeoCare Premium Baby Diaper Belt L (7-18 kg)", quantity: 3, price: 123, oldPrice: 125, priceHtml: "", thumbnail: "http://localhost/wp/wp-content/uploads/2025/05/5-24-2025-11-25-05-AM.png" },
	// 	{ id: 125, title: "MamyPoko Pants Diaper Pant L (9-14 kg)", quantity: 3, price: 123, oldPrice: 125, priceHtml: "", thumbnail: "http://localhost/wp/wp-content/uploads/2025/05/5-24-2025-11-25-05-AM.png" },
	// ]);




	const [cartTotal, setcartTotal] = useState(0);
	const [shippingCost, setshippingCost] = useState(0);

	useEffect(() => {
		var total = 0;
		var totalQuantity = 0;

		cartItems.map(item => {

			var quantity = parseInt(item.quantity)
			var price = parseInt(item.price)

			total += (price * quantity);
			totalQuantity += quantity;

		})

		setcartTotal(total)
		setcartTotalQuantity(totalQuantity)
		setcartTotalPay(cartTotal + shippingCost - coupons.discountAmount)

	}, [cartItems]);




	function calculateCoupon() {

		var discountRate = 10;
		const discountAmount = (cartTotal * discountRate) / 100;

		return discountAmount;
	}
	function calculateShipping() {



	}


	return (
		<div className="relative">
			<div className="flex items-center gap-3 text-500 px-4 rounded-sm py-2 hover:bg-amber-500 bg-amber-600 cursor-pointer text-white" onClick={ev => {
				setcartToggle(!cartToggle)


			}}><IconBasketCheck /> {cartTotalQuantity}</div>


			{steps == 0 && (
				<>
					{cartToggle && (
						<div className="fixed z-50 top-0 right-0 h-full w-[500px] bg-white  shadow-xl   rounded-sm">
							<div className="flex justify-between bg-gray-700 py-2 px-3 text-white">
								<div>Total Items - {cartTotalQuantity}</div>
								<div className="flex gap-2">
									<div className=" text-red-500 border-2 border-gray-200 px-3 py-1 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
										onClick={ev => {
											resetCartItems()

										}}
									><IconShoppingCartCancel width={18} />
										Reset
									</div>
									<div className=" text-red-500 border-2 border-gray-200 px-3 py-1 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
										onClick={ev => {
											setcartToggle(!cartToggle)

										}}
									><IconX width={18} />
										Close
									</div>


								</div>
							</div>

							{/* <CartItems /> */}

							<div className="px-2">
								{cartItems.map((item, index) => {

									return (
										<div className="flex gap-2 px-2 items-center justify-between py-3 border-b border-solid border-gray-400">





											<div className="flex gap-2 items-center">

												<div className="flex flex-col gap-1 items-center   rounded-sm border-gray-500 text-gray-500 ">


													<span onClick={() => {

														var cartItemsX = [...cartItems]
														cartItemsX[index].quantity = item.quantity + 1;
														//setcartItems(cartItemsX)
													}} className="cursor-pointer hover:text-gray-600 bg-amazon-600 rounded-sm text-white">
														<IconChevronUp />
													</span>
													{/* <input type="text" name="" className="w-12 !p-0 !border-0 !shadow-none text-center focus:border-0" value={item.quantity} onChange={ev => {
												// var quantity = parseInt(ev.target.value);
												// setquantity(quantity)
											}} /> */}
													<span>{item.quantity}</span>
													<span onClick={() => {

														var cartItemsX = [...cartItems]
														cartItemsX[index].quantity = item.quantity == 1 ? 1 : item.quantity - 1;
														//setcartItems(cartItemsX)
													}} className="cursor-pointer hover:text-gray-600 bg-amazon-600 rounded-sm text-white">
														<IconChevronDown />
													</span>
												</div>
												<div className="flex  gap-2">

													<div className="w-18 overflow-hidden">
														<img className="w-full" src={item.thumbnail} alt="" />
													</div>

													<div>

														<div className="text-sm">{item.title}</div>


														<div className="flex gap-3 items-center ">
															<div className="text-sm">${item.price}</div>
															<div className="text-sm line-through">${item.oldPrice}</div>


															<div className=" text-red-500 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
																onClick={ev => {
																	var cartItemsX = [...cartItems]
																	cartItemsX.splice(index, 1)
																	//setcartItems(cartItemsX)
																	removeCartItems(item.id)
																}}
															><IconTrash width={18} /> Remove</div>
														</div>

													</div>
												</div>
											</div>
											<div className="flex gap-2">

												<div className="flex gap-1 items-center" >
													<div>${item.price}</div>
													<div><IconLetterX width={18} /></div>
													<div>
														{item.quantity} =
													</div>
												</div>

												${item.price * item.quantity}</div>

										</div>
									)

								})}
							</div>



							<div className="flex justify-between px-4 py-4">
								<div>Cart Total</div>
								<div className="font-bold">${cartTotal}</div>
							</div>


							{/* {JSON.stringify(coupons)} */}

							{!coupons?.applied && (

								<div className="flex gap-2  px-4 py-4">
									<div>
										<input type="text" name="" className="w-28   !border-2 border-solid border-gray-400 !shadow-none text-center focus:border-0" value={coupons.couponCode} onChange={ev => {

											var value = ev.target.value;
											var couponsX = { ...coupons }
											couponsX.couponCode = value;

											setcoupons(couponsX)
										}} />
									</div>
									<div className="text-white bg-gray-600  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
										var couponsX = { ...coupons }

										if (couponsX.couponCode.length > 0) {
											couponsX.applied = true;


											var discountAmount = calculateCoupon()

											couponsX.discountAmount = discountAmount;
											console.log(couponsX)

											setcoupons(couponsX)
										}


									}}>Apply Coupon</div>

								</div>
							)}
							{coupons.applied && (

								<div className="flex justify-between items-center px-4 py-4">
									<div className="flex flex-col gap-1">
										<div>Discount</div>
										<div className="flex gap-2 items-center">
											<div className="border-2 border-dashed rounded-sm px-4 py-1 border-green-700 cursor-pointer hover:bg-amazon-300 ">{coupons.couponCode}</div>
											<div className="text-red-400 cursor-pointer hover:text-red-600" onClick={ev => {
												var couponsX = { ...coupons }
												couponsX.applied = false;
												couponsX.couponCode = "";
												couponsX.discountAmount = 0;

												setcoupons(couponsX)

											}}>Remove</div>
										</div>
									</div>
									<div className="font-bold text-red-500">-${coupons.discountAmount}</div>
								</div>

							)}

							<div className="flex justify-between items-center px-4 py-4">
								<div className="flex flex-col gap-2">
									<div>Delivery</div>
									<select name="" id="" onChange={ev => {
										var amount = 0;
										var value = ev.target.value;
										if (value == 'express') {
											amount = 20;
										}
										if (value == 'normal') {
											amount = 5;
										}

										setshippingCost(amount)

									}}>
										<option value="express">Express</option>
										<option value="normal">Normal</option>
										<option value="free">Free</option>
									</select>
								</div>
								<div className="font-bold text-green-500">+${shippingCost}</div>
							</div>
							<div className="flex justify-between px-4 py-4 border-t-2 border-dashed border-t-gray-400 ">
								<div className="text-lg font-bold text-gray-500">Total Amount to Pay</div>
								<div className="font-bold text-green-500">${cartTotalPay}</div>
							</div>


							<div className="flex justify-end px-4 py-4">


								<div>
									<div className="  text-white bg-gray-600  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
										setSteps(1)
									}}>Go To Checkout</div>

								</div>

							</div>



						</div>
					)}
				</>
			)}
			{steps == 1 && (
				<>
					{cartToggle && (
						<div className="fixed overflow-y-auto z-50 top-0 right-0 h-full w-[500px] bg-white  shadow-xl   rounded-sm">
							<div className="flex justify-between bg-gray-700 py-2 px-3 text-white">
								<div>Checkout</div>
								<div className="flex gap-2">

									<div className=" text-red-500 border-2 border-gray-200 px-3 py-1 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
										onClick={ev => {
											setcartToggle(!cartToggle)

										}}
									><IconX width={18} />
										Close
									</div>


								</div>
							</div>

							<div className=" flex gap-2   px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
								setSteps(0)
							}}>
								<IconCornerUpLeftDouble />
								Back to Cart</div>

							<Checkout />




						</div>
					)}
				</>
			)}



		</div>
	);
};

export default Cart;
