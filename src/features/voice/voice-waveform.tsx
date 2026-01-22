"use client";

import { useEffect, useRef } from "react";

interface VoiceWaveformProps {
	analyserNode: AnalyserNode | null;
}

const HALF_BAR_COUNT = 12;
const SMOOTHING_FACTOR = 0.25;
const MIN_BAR_HEIGHT = 3;
const GLOW_THRESHOLD = 80;

export function VoiceWaveform({ analyserNode }: VoiceWaveformProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number>(0);
	const smoothedDataRef = useRef<number[]>([]);

	useEffect(() => {
		if (!analyserNode || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		canvas.width = canvas.offsetWidth * dpr;
		canvas.height = canvas.offsetHeight * dpr;
		ctx.scale(dpr, dpr);

		const displayWidth = canvas.offsetWidth;
		const displayHeight = canvas.offsetHeight;
		const centerY = displayHeight / 2;
		const maxBarHeight = displayHeight / 2 - 6;

		const totalBarWidth = displayWidth * 0.9;
		const barWidth = totalBarWidth / (HALF_BAR_COUNT * 2) - 2;
		const gap = 2;
		const startX = (displayWidth - totalBarWidth) / 2;

		const bufferLength = analyserNode.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

		if (smoothedDataRef.current.length !== HALF_BAR_COUNT) {
			smoothedDataRef.current = new Array(HALF_BAR_COUNT).fill(MIN_BAR_HEIGHT);
		}

		function drawBar(x: number, y: number, width: number, height: number, gradient: CanvasGradient) {
			ctx!.beginPath();
			ctx!.roundRect(x, y, width, height, width / 2);
			ctx!.fillStyle = gradient;
			ctx!.fill();
		}

		function draw() {
			animationRef.current = requestAnimationFrame(draw);
			analyserNode!.getByteFrequencyData(dataArray);
			ctx!.clearRect(0, 0, displayWidth, displayHeight);

			for (let i = 0; i < HALF_BAR_COUNT; i++) {
				const dataIndex = Math.floor((i * bufferLength) / HALF_BAR_COUNT);
				const value = dataArray[dataIndex];
				const targetHeight = Math.max(MIN_BAR_HEIGHT, (value / 255) * maxBarHeight);

				smoothedDataRef.current[i] += (targetHeight - smoothedDataRef.current[i]) * SMOOTHING_FACTOR;
				const barHeight = smoothedDataRef.current[i];

				const leftX = startX + (HALF_BAR_COUNT - 1 - i) * (barWidth + gap);
				const rightX = startX + (HALF_BAR_COUNT + i) * (barWidth + gap);
				const y = centerY - barHeight;
				const height = barHeight * 2;

				const gradient = ctx!.createLinearGradient(0, y, 0, y + height);
				gradient.addColorStop(0, "#B552D9");
				gradient.addColorStop(0.5, "#D06AE8");
				gradient.addColorStop(1, "#FA8485");

				if (value > GLOW_THRESHOLD) {
					ctx!.shadowColor = "#B552D9";
					ctx!.shadowBlur = 6;
				}

				drawBar(leftX, y, barWidth, height, gradient);
				drawBar(rightX, y, barWidth, height, gradient);

				ctx!.shadowBlur = 0;
			}
		}

		draw();

		return () => {
			cancelAnimationFrame(animationRef.current);
		};
	}, [analyserNode]);

	return <canvas ref={canvasRef} className="h-20 w-full rounded-xl" />;
}
