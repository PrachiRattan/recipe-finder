// import { Search } from "lucide-react";
// import RecipeCard from "../components/RecipeCard";
// import { useEffect, useState } from "react";
// import { getRandomColor } from "../lib/utils";

// const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRecipes = async (searchQuery) => {
//     setLoading(true);
//     setRecipes([]);
//     try {
//       const res = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=9`
//       );
//       const data = await res.json();
//       setRecipes(data.results || []);
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecipes("chicken"); // Default search
//   }, []);

//   const handleSearchRecipe = (e) => {
//     e.preventDefault();
//     const searchQuery = e.target[0].value.trim();
//     if (searchQuery) {
//       fetchRecipes(searchQuery);
//     }
//   };

//   return (
//     <div className="bg-[#faf9fb] p-10 flex-1">
//       <div className="max-w-screen-lg mx-auto">
//         <form onSubmit={handleSearchRecipe}>
//           <label className="input shadow-md flex items-center gap-2">
//             <Search size={24} />
//             <input
//               type="text"
//               className="text-sm md:text-md grow"
//               placeholder="What do you want to cook today?"
//             />
//           </label>
//         </form>

//         <h1 className="font-bold text-3xl md:text-5xl mt-4">Recommended Recipes</h1>
//         <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
//           Popular choices
//         </p>

//         <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {!loading &&
//             recipes.map((recipe, index) => (
//               <RecipeCard
//                 key={index}
//                 recipe={{
//                   ...recipe,
//                   isHealthy: recipe.title.toLowerCase().includes("salad") || recipe.title.toLowerCase().includes("grilled"),
//                 }}
//                 {...getRandomColor()}
//               />
//             ))}

//           {loading &&
//             [...Array(9)].map((_, index) => (
//               <div key={index} className="flex flex-col gap-4 w-full">
//                 <div className="skeleton h-32 w-full"></div>
//                 <div className="flex justify-between">
//                   <div className="skeleton h-4 w-28"></div>
//                   <div className="skeleton h-4 w-24"></div>
//                 </div>
//                 <div className="skeleton h-4 w-1/2"></div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;




import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const HomePage = () => {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchRecipes = async (searchQuery) => {
		setLoading(true);
		setRecipes([]);
		try {
			// Step 1: First get simple recipes list
			const res = await fetch(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=9`
			);
			const data = await res.json();

			// Step 2: Now fetch full information for each recipe ID
			const detailedRecipes = await Promise.all(
				data.results.map(async (recipe) => {
					const infoRes = await fetch(
						`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
					);
					const infoData = await infoRes.json();
					return infoData;
				})
			);

			setRecipes(detailedRecipes);
			console.log(detailedRecipes);  // You'll now see full info like cuisines, diets etc
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRecipes("shakes");
	}, []);

	const handleSearchRecipe = (e) => {
		e.preventDefault();
		fetchRecipes(e.target[0].value);
	};

	return (
		<div className='bg-[#faf9fb] p-10 flex-1'>
			<div className='max-w-screen-lg mx-auto'>
				<form onSubmit={handleSearchRecipe}>
					<label className='input shadow-md flex items-center gap-2'>
						<Search size={"24"} />
						<input
							type='text'
							className='text-sm md:text-md grow'
							placeholder='What do you want to cook today?'
						/>
					</label>
				</form>

				<h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</h1>
				<p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>

				<div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{!loading &&
						recipes.map((recipe, index) => (
							<RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
						))}

					{loading &&
						[...Array(9)].map((_, index) => (
							<div key={index} className='flex flex-col gap-4 w-full'>
								<div className='skeleton h-32 w-full'></div>
								<div className='flex justify-between'>
									<div className='skeleton h-4 w-28'></div>
									<div className='skeleton h-4 w-24'></div>
								</div>
								<div className='skeleton h-4 w-1/2'></div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
