import { useState } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconIdBadge2 } from "@tabler/icons-react";
import { useCounterStore } from '../../store/useCounterStore'

const AddToCart = ({ productData }) => {

	var id = productData?.id

	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setquantity] = useState(1);
	const { notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	function addToCart() {

		addCartItems({ id: id, title: productData?.title, quantity: quantity, price: productData?.price, oldPrice: productData?.oldPrice, priceHtml: productData?.price_html, thumbnail: productData?.post_thumbnail?.src })

	}
	function buyNow() { }


	return (
		<div className="flex gap-2 items-center">

			<div className="flex border-2 border-solid gap-2 items-center  p-1 rounded-sm border-gray-500 text-gray-500 ">
				<span onClick={() => setquantity(quantity == 1 ? 1 : quantity - 1)} className="cursor-pointer hover:text-gray-600">
					<IconSquareRoundedMinusFilled />
				</span>
				<input type="text" name="" className="w-16 !border-0 !shadow-none text-center focus:border-0" value={quantity} onChange={ev => {
					var quantity = parseInt(ev.target.value);
					setquantity(quantity)
				}} />
				<span onClick={() => setquantity(quantity + 1)} className="cursor-pointer hover:text-gray-600">
					<IconSquareRoundedPlusFilled />
				</span>
			</div>
			<div onClick={() => addToCart(id)} className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-[10px] rounded-sm">Add To Cart</div>
			{/* <div onClick={() => buyNow(id)} className="bg-amazon-500 hover:bg-amazon-600 cursor-pointer text-white px-4 py-[10px] rounded-sm">By Now</div> */}


		</div>
	);
};

export default AddToCart;
