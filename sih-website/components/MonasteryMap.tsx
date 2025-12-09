import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const MONASTERIES = [
	{
		id: "tashiding",
		image: "/monasteries/tashiding.png",
		mapPos: { top: "16%", left: "62%" },
	},
	{
		id: "tsuk",
		image: "/tsuk/archive2.jpg",
		mapPos: { top: "37%", left: "33%" },
	},
	{
		id: "dubdi",
		image: "/monasteries/dubdi.png",
		mapPos: { top: "56%", left: "55%" },
	},
	{
		id: "rumtek",
		image: "/monasteries/rumtek.jpg",
		mapPos: { top: "80%", left: "25%" },
	},
];

export default function MonasteryMap() {
		 const { t } = useTranslation();
		 const [selected, setSelected] = useState<number | null>(null);
		 const [visible, setVisible] = useState(false);
		 const mapRef = useRef<HTMLDivElement>(null);

		 useEffect(() => {
			 const observer = new window.IntersectionObserver(
				 ([entry]) => {
					 setVisible(entry.isIntersecting);
				 },
				 { threshold: 0.2 }
			 );
			 if (mapRef.current) {
				 observer.observe(mapRef.current);
			 }
			 return () => observer.disconnect();
		 }, []);

		 return (
				 <div
					 ref={mapRef}
					 style={{
						 marginTop: '10rem',
						 marginBottom: '5rem',
						 transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
						 opacity: visible ? 1 : 0,
						 transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-8deg)',
						 filter: visible ? 'blur(0)' : 'blur(8px)'
					 }}
				 >
		   {/* Heading and Subtitle */}
		   <div className="w-full flex flex-col items-center pt-6 pb-2 bg-[#4b2323] mb-16">
			<h2 className="text-4xl font-cinzel text-amber-100 mb-2 text-center">
				{t("map.heading")}
			</h2>
			<div className="text-lg text-amber-100/80 font-lora text-center max-w-3xl">
				{t("map.subtitle")}
				<br />
				{t("map.hoverInstruction")}
			</div>
		   </div>
			   {/* Map and Details */}
			   <div className="w-full flex flex-row justify-center items-start gap-16 mt-20 mb-24">
				{/* Left: Map */}
				<div className="relative" style={{ width: 400, height: 600 }}>
					<img
						src="/map.png"
						alt="Sikkim Map"
						className="w-full h-full object-contain rounded-2xl shadow-lg"
					/>
					{MONASTERIES.map((m, i) => (
						<button
							key={i}
							style={{
								position: "absolute",
								top: m.mapPos.top,
								left: m.mapPos.left,
								transform: "translate(-50%, -100%)",
								zIndex: 2,
							}}
						className={`bg-amber-200 border-4 border-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 ${
							selected === i ? "scale-110 border-amber-400" : ""
						}`}
						onClick={() => setSelected(i)}
						aria-label={t(`map.monasteries.${m.id}.name`)}
					>
						{/* Pin Icon */}
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<ellipse cx="12" cy="8" rx="3" ry="3" fill="#b45309" />
								<path
									d="M12 2C7.58 2 4 5.58 4 10c0 4.42 8 10 8 10s8-5.58 8-10c0-4.42-3.58-8-8-8z"
									fill="#b45309"
									stroke="#fff"
									strokeWidth="1"
								/>
							</svg>
						</button>
					))}
				</div>
				{/* Right: Details Card */}
				<div className="bg-[#4b2323] rounded-3xl p-8 min-w-[340px] max-w-[400px] shadow-xl flex flex-col items-center">
					<h3 className="text-3xl font-cinzel text-amber-300 mb-4 text-center">
						{t("map.detailsTitle")}
					</h3>
					{selected === null ? (
						<div className="flex flex-col items-center justify-center h-full gap-6">
							<span className="mb-4">
								<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
									<ellipse cx="24" cy="16" rx="6" ry="6" fill="#eab308" />
									<path
										d="M24 6C15.163 6 8 13.163 8 22c0 8.837 16 20 16 20s16-11.163 16-20c0-8.837-7.163-16-16-16z"
										fill="#eab308"
										stroke="#fff"
										strokeWidth="2"
									/>
								</svg>
							</span>
							<p className="text-lg text-white/80 font-lora text-center mb-4">
								{t("map.clickInstruction")}
							</p>
							<div className="bg-amber-100 text-[#4b2323] font-cinzel px-8 py-4 rounded-xl text-xl font-bold mt-2">
								{t("map.defaultVisitors")}
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center gap-4">
							<img
								src={MONASTERIES[selected].image}
								alt={t(`map.monasteries.${MONASTERIES[selected].id}.name`)}
								className="w-32 h-20 object-cover rounded-xl mb-2"
							/>
							<div className="text-2xl font-cinzel text-amber-300 mb-2 text-center">
								{t(`map.monasteries.${MONASTERIES[selected].id}.name`)}
							</div>
							<div className="text-lg text-white/90 font-lora text-center mb-2">
								{t(`map.monasteries.${MONASTERIES[selected].id}.description`)}
							</div>
							<div className="bg-amber-100 text-[#4b2323] font-cinzel px-8 py-3 rounded-xl text-lg font-bold mt-2">
								{t(`map.monasteries.${MONASTERIES[selected].id}.visitors`)}
							</div>
							<div className="text-white/80 font-merriweather text-base mt-2">
								{t("map.locationLabel")}: {t(`map.monasteries.${MONASTERIES[selected].id}.location`)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
