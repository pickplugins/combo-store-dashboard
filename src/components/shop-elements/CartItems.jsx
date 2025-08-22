import { useState } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconIdBadge2 } from "@tabler/icons-react";

const CartItems = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [items, setitems] = useState(null);


	function addToCart() { }
	function buyNow() { }


	return (
		<div className="flex gap-2 items-center">



		</div>
	);
};

export default CartItems;
