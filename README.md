# Stock Trading Comparison Platform: Architecture Documentation

## Overview
This platform is a high-performance comparison engine designed specifically for the United States stock brokerage market. The system architecture is built to deliver instantaneous feature filtering, real-time data rendering, and dynamic AI-driven comparative analysis.

## Core Technical Stack

- **Framework**: **Next.js (App Router)**. A hybrid rendering approach is utilized to serve static, SEO-optimized content for brokerage reviews, while reserving dynamic client-side rendering for interactive fee comparison grids. Server-side computing protects sensitive API keys and internal routing logic.
- **Language**: **TypeScript**. Implementing strict typings across the entire application guarantees predictable data shapes. This prevents catastrophic rendering errors when managing complex financial data schemas such as tiered commission structures and variable margin rates.
- **Styling Methodology**: **Tailwind CSS**. A utility-first CSS framework enforces a rigorous, centralized design token system. It prevents the accumulation of dead styles and ensures the layout remains lightweight, contributing to rapid page load metrics.
- **AI Integration**: **Vercel AI SDK**. This tool powers the interactive comparison modal. By utilizing edge-compatible functions, it streams generative text tokens directly to the client interface, providing users with immediate analytical feedback without halting the main application thread.

## Application Structure

The platform follows a highly modular, decoupled architecture:

1. **Routing and Layout Layer (`/app`)**: 
   This directory manages the core page structure. It provides centralized metadata generation and nested layouts, ensuring navigation remains seamless when moving between the main comparison table and individual brokerage pages.

2. **Component Library (`/components`)**:
   - **Presentational Components**: Isolated, stateless elements including typography headers, buttons, and structural containers.
   - **Interactive Modules**: Complex state-driven features such as the AI comparison interface, the platform selection matrix, and dynamic filtering toggles.

3. **Data Management Layer**:
   Broker configuration data is strictly formatted into defined structured objects. This guarantees that when the generative AI formulates a comparison, it ingests precise, standardized metrics (e.g., options contract fees, minimum deposit requirements) rather than scraping unstructured markdown.

4. **API Endpoints**: 
   Internal serverless routes orchestrate communication between the presentation layer and external Large Language Models (LLMs). These routes handle prompt generation, contextual data injection, and rate limiting before forwarding the sanitized request to the AI provider.

