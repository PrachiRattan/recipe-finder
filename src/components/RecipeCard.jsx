// import { Heart, HeartPulse, Soup } from "lucide-react";
// import { useState } from "react";

// const RecipeCard = ({ recipe, bg, badge }) => {
//   const [isFavorite, setIsFavorite] = useState(
//     JSON.parse(localStorage.getItem("favorites") || "[]").some(
//       (fav) => fav.idMeal === recipe.idMeal || fav.id === recipe.id // checking for both API types
//     )
//   );

//   const addRecipeToFavorites = () => {
//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const isRecipeAlreadyInFavorites = favorites.some(
//       (fav) => fav.idMeal === recipe.idMeal || fav.id === recipe.id
//     );

//     if (isRecipeAlreadyInFavorites) {
//       favorites = favorites.filter(
//         (fav) => fav.idMeal !== recipe.idMeal && fav.id !== recipe.id
//       );
//       setIsFavorite(false);
//     } else {
//       favorites.push(recipe);
//       setIsFavorite(true);
//     }

//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   };

//   // Smart detect image and title (for both APIs)
//   const imageUrl = recipe.strMealThumb || recipe.image;
//   const title = recipe.strMeal || recipe.title;

//   return (
// <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative 
//   ${recipe.isHealthy ? "ring-2 ring-green-400 shadow-md" : ""}`}>

//       <a
//         href={recipe.idMeal ? `https://www.themealdb.com/meal.php?c=${recipe.idMeal}` : "#"}
//         target="_blank"
//         className="relative h-32"
//       >
//         <div className="skeleton absolute inset-0" />
//         <img
//           src={imageUrl}
//           alt="recipe img"
//           className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
//           onLoad={(e) => {
//             e.currentTarget.style.opacity = 1;
//             e.currentTarget.previousElementSibling.style.display = "none";
//           }}
//         />

//         <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 flex items-center gap-1 text-sm">
//           <Soup size={16} /> Recipe
//         </div>

//         <div
//           className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
//           onClick={(e) => {
//             e.preventDefault();
//             addRecipeToFavorites();
//           }}
//         >
//           {!isFavorite && <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />}
//           {isFavorite && <Heart size={20} className="fill-red-500 text-red-500" />}
//         </div>
//       </a>

//       <div className="flex mt-1">
//         <p className="font-bold tracking-wide">{title}</p>
//       </div>

//       <div className="flex gap-2 mt-auto">
//         {recipe.isHealthy && (
//           <div className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
//             <HeartPulse size={16} />
//             <span className="text-sm tracking-tighter font-semibold">Healthy</span>
//           </div>
//         )}

//         <div className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
//           <HeartPulse size={16} />
//           <span className="text-sm tracking-tighter font-semibold">Tasty</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;



// import { Heart, HeartPulse, Soup } from "lucide-react";
// import { useState } from "react";

// const RecipeCard = ({ recipe, bg, badge }) => {
// 	const [isFavorite, setIsFavorite] = useState(
// 		JSON.parse(localStorage.getItem("favorites") || "[]").some((fav) => fav.id === recipe.id)
// 	);

// 	const addRecipeToFavorites = () => {
// 		let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
// 		const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.id === recipe.id);

// 		if (isRecipeAlreadyInFavorites) {
// 			favorites = favorites.filter((fav) => fav.id !== recipe.id);
// 			setIsFavorite(false);
// 		} else {
// 			favorites.push(recipe);
// 			setIsFavorite(true);
// 		}

// 		localStorage.setItem("favorites", JSON.stringify(favorites));
// 	};

// 	// Extract health-related tags from Spoonacular API data
// 	const healthLabels = [];
// 	if (recipe.veryHealthy) {
// 		healthLabels.push("Healthy");
// 	}
// 	if (recipe.diets && recipe.diets.length > 0) {
// 		healthLabels.push(...recipe.diets);
// 	}

// 	return (
// 		<div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
// 			<a
// 				href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
// 				target='_blank'
// 				className='relative h-32'
// 			>
// 				<div className='skeleton absolute inset-0' />
// 				<img
// 					src={recipe.image}
// 					alt='recipe img'
// 					className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
// 					onLoad={(e) => {
// 						e.currentTarget.style.opacity = 1;
// 						e.currentTarget.previousElementSibling.style.display = "none";
// 					}}
// 				/>

// 				<div className='absolute bottom-2 left-2 bg-white rounded-full p-1 flex items-center gap-1 text-sm'>
// 					<Soup size={16} /> Recipe
// 				</div>

// 				<div
// 					className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer'
// 					onClick={(e) => {
// 						e.preventDefault();
// 						addRecipeToFavorites();
// 					}}
// 				>
// 					{!isFavorite && <Heart size={20} className='hover:fill-red-500 hover:text-red-500' />}
// 					{isFavorite && <Heart size={20} className='fill-red-500 text-red-500' />}
// 				</div>
// 			</a>

// 			<div className='flex mt-1'>
// 				<p className='font-bold tracking-wide'>{recipe.title}</p>
// 			</div>

// 			<div className='flex gap-2 mt-auto'>
// 				{/* Display health tags dynamically */}
// 				{healthLabels.length > 0 && healthLabels.map((label, index) => (
// 					<div key={index} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
// 						<HeartPulse size={16} />
// 						<span className='text-sm tracking-tighter font-semibold'>{label}</span>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default RecipeCard;

import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState } from "react";

const getTwoValuesFromArray = (arr) => {
	return [arr[0], arr[1]].filter(Boolean); // to handle undefined safely
};

const RecipeCard = ({ recipe, bg, badge }) => {
	const healthLabels = getTwoValuesFromArray(recipe.diets); // diets array
	const [isFavorite, setIsFavorite] = useState(
		JSON.parse(localStorage.getItem("favorites") || "[]").some((fav) => fav.id === recipe.id)
	);

	const addRecipeToFavorites = () => {
		let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
		const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.id === recipe.id);

		if (isRecipeAlreadyInFavorites) {
			favorites = favorites.filter((fav) => fav.id !== recipe.id);
			setIsFavorite(false);
		} else {
			favorites.push(recipe);
			setIsFavorite(true);
		}

		localStorage.setItem("favorites", JSON.stringify(favorites));
	};

	return (
		<div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
			<a
				href={`https://spoonacular.com/recipes/${recipe.title
					.toLowerCase()
					.split(" ")
					.join("-")}-${recipe.id}`}
				target='_blank'
				className='relative h-32'
			>
				<div className='skeleton absolute inset-0' />
				<img
					src={recipe.image}
					alt='recipe img'
					className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
					onLoad={(e) => {
						e.currentTarget.style.opacity = 1;
						e.currentTarget.previousElementSibling.style.display = "none";
					}}
				/>

				<div className='absolute bottom-2 left-2 bg-white rounded-full p-1 flex items-center gap-1 text-sm'>
					<Soup size={16} /> {recipe.servings} Servings
				</div>

				<div
					className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer'
					onClick={(e) => {
						e.preventDefault();
						addRecipeToFavorites();
					}}
				>
					{!isFavorite && <Heart size={20} className='hover:fill-red-500 hover:text-red-500' />}
					{isFavorite && <Heart size={20} className='fill-red-500 text-red-500' />}
				</div>
			</a>

			<div className='flex mt-1'>
				<p className='font-bold tracking-wide'>{recipe.title}</p>
			</div>

			<p className='my-2'>
				{recipe.cuisines.length > 0 ? recipe.cuisines[0] + " Kitchen" : "Cuisine Unknown"}
			</p>

			<div className='flex gap-2 mt-auto'>
				{healthLabels.length > 0 ? (
					healthLabels.map((label, idx) => (
						<div key={idx} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
							<HeartPulse size={16} />
							<span className='text-sm tracking-tighter font-semibold'>{label}</span>
						</div>
					))
				) : (
					<div className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
						<HeartPulse size={16} />
						<span className='text-sm tracking-tighter font-semibold'>Healthy</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default RecipeCard;
