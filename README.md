# TradeNav
TradeNav is a Chrome extension I built to make navigating complex websites a little easier.
While using TradingView, I realised that finding certain tools and features can take time, especially when you're not familiar with the platform.
So I thought, why not build an assistant where users can simply ask where something is and get directions?

That's how I started working on TradeNav.

## How it works
You can open the TradeNav assistant while browsing TradingView and ask questions in normal language, such as "Where can I find RSI?"
The extension sends your question to a Spring Boot backend, which uses Gemini AI along with a collection of TradingView navigation data to generate an answer.

## Technologies that I used
* JavaScript, HTML and CSS
* Java and Spring Boot
* Google Gemini API
* Chrome Extension (Manifest V3)
* Docker
* Render

## Current status
The extension is working with TradingView, and the backend is deployed on Render.
The backend handles navigation requests from the extension and uses Gemini AI to generate responses.
This is a personal learning project where I'm exploring browser extensions, backend development and integrating AI into real-world applications.

## What's next?
I would like to improve the navigation accuracy and eventually extend TradeNav to support other websites as well.
