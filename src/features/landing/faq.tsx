"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export function FAQ() {
	const t = useTranslations();
	const faqs = [
		{
			question: t("faq_1_question"),
			answer: t("faq_1_answer"),
		},
		{
			question: t("faq_2_question"),
			answer: t("faq_2_answer"),
		},
		{
			question: t("faq_3_question"),
			answer: t("faq_3_answer"),
		},
		{
			question: t("faq_4_question"),
			answer: t("faq_4_answer"),
		},
		{
			question: t("faq_5_question"),
			answer: t("faq_5_answer"),
		},
		{
			question: t("faq_6_question"),
			answer: t("faq_6_answer"),
		},
		{
			question: t("faq_7_question"),
			answer: t("faq_7_answer"),
		},
		{
			question: t("faq_8_question"),
			answer: t("faq_8_answer"),
		},
	];

	return (
		<section id="faq" className="py-20 px-6 bg-muted/30">
			<div className="max-w-3xl mx-auto">
				{/* Section headline */}
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
					{t("faq_title")}
				</h2>

				<p className="text-center text-muted-foreground mb-12 text-lg">
					{t("faq_subtitle")}
				</p>

				{/* FAQ Accordion */}
				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="border-b border-border"
						>
							<AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground text-base pb-6">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
