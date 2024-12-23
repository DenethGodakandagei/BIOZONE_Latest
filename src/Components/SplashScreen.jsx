import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgimage from "../Assest/Web_Images/Bg Plexus.png";
import Logo from "../Assest/Web_Images/BioZoneLogo.png";

const SplashScreen = () => {
	const [language, setLanguage] = useState("en");
	const navigate = useNavigate();

	// Handle language s
	const handleLanguageChange = (lang) => {
		setLanguage(lang);
		localStorage.setItem("language", lang); // Save to localStorage
		navigate(`/home?lang=${lang}`); // Navigate to home
	};

	return (
		<div className="flex items-center justify-center min-h-screen relative">
			{/* Background Image */}
			<img
				src={bgimage}
				alt="Background DNA sample"
				className="absolute left-0 bottom-0 -z-10"
			/>
			<div className="text-center relative z-10">
				{/* Logo with Animation */}
				<motion.img
					alt="Biozone logo"
					className="mx-auto mb-4"
					height="100"
					src={Logo}
					width="100"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				/>
				<h1 className="text-2xl font-bold text-green-600 mb-2">BIOZONE</h1>
				<p className="text-gray-600 mb-6">Select language to continue</p>
				<div className="m-2">
					<button
						onClick={() => handleLanguageChange("en")}
						className="w-40 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
					>
						English
					</button>
				</div>
				<div className="m-2">
					<button
						onClick={() => handleLanguageChange("si")}
						className="w-40 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
					>
						සිංහල
					</button>
				</div>

			</div>
		</div>
	);
};

export default SplashScreen;
