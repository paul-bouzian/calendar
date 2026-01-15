import { setRequestLocale } from "next-intl/server";
import {
	CTA,
	FAQ,
	Features,
	Footer,
	Hero,
	Navbar,
	Pricing,
	Problem,
	Solution,
	Testimonials,
} from "@/features/landing";

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main>
				<Hero />
				<Problem />
				<Solution />
				<Features />
				<Testimonials />
				<Pricing />
				<FAQ />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}
