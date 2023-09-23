export const getCategoryDescriptionBySlug = (categorySlug: string) => {
	switch (categorySlug) {
		case "t-shirts":
			return "We invite you to discover our extensive collection of T-shirts that will meet all your fashion and self-expression needs. Our offer includes a variety of styles, patterns and colors so that everyone can find something perfect for themselves. Explore our T-Shirts category and see why we are your best source of fashion inspiration.";

		case "hoodies":
			return "Winter cold is endured with even greater pleasure thanks to our unique hoodies. Our offer includes hoodies made of soft and durable materials that combine comfort with style. Choose from a variety of patterns, colors and details that will emphasize your individual character.";

		case "accessories":
			return "Transform your everyday style into something unique and expressive with our extraordinary collection of accessories. Discover our unique accessories that emphasize your character and add shine to every occasion. In our store you will find a wide selection of accessories that will meet your expectations.";

		default:
			return "We are your favorite source of the latest trends and unique accessories that will allow you to express yourself and feel special. Our offer includes three fascinating categories: T-Shirts, Hoodies and Accessories. See why we are one of the best places to shop for fashion.";
	}
};
