package com.tradenav.backend;

import java.io.InputStream;
import java.util.Locale;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import tools.jackson.databind.ObjectMapper;

@Service
public class NavigationService {

    private final NavigationData navigationData;

    public NavigationService() {

        try {
            ObjectMapper mapper = new ObjectMapper();

            ClassPathResource resource =
                    new ClassPathResource("Navigation/tradingview.json");

            InputStream inputStream = resource.getInputStream();

            navigationData =
                    mapper.readValue(inputStream, NavigationData.class);

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to load TradingView navigation data",
                    e
            );
        }
    }

    public NavigationData getNavigationData() {
        return navigationData;
    }

    public String findAnswer(String question) {

        if (question == null || question.trim().isEmpty()) {
            return "Please tell me what you are looking for.";
        }

        String q = question.toLowerCase(Locale.ROOT);

        // XAUUSD / instruments
        if (q.contains("xauusd")
                || q.contains("symbol")
                || q.contains("instrument")
                || q.contains("find a stock")
                || q.contains("find forex")
                || q.contains("find crypto")) {

            return "Use the Search button or press Ctrl+K to search for an instrument such as XAUUSD.";
        }

        // Indicators
        if (q.contains("indicator")
                || q.contains("rsi")
                || q.contains("macd")) {

            return "Open Indicators from the TradingView chart toolbar.";
        }

        // Timeframe
        if (q.contains("timeframe")
                || q.contains("time frame")
                || q.contains("1 minute")
                || q.contains("5 minute")
                || q.contains("15 minute")) {

            return "Use the Timeframe control on the chart toolbar to change the chart timeframe.";
        }

        // Alerts
        if (q.contains("alert")
                || q.contains("notification")) {

            return "Use the Alert option on the TradingView chart to create or manage alerts.";
        }

        // Drawing tools
        if (q.contains("drawing")
                || q.contains("trend line")
                || q.contains("draw on chart")) {

            return "Open the Drawing Tools available on the chart.";
        }

        // High-volume stocks
        if (q.contains("high volume")
                || q.contains("highest volume")) {

            return "Open Highest Volume Stocks from the TradingView market lists.";
        }

        // Volatile stocks
        if (q.contains("volatile")
                || q.contains("volatility")) {

            return "Open Most Volatile Stocks from the TradingView market lists.";
        }

        // Gainers
        if (q.contains("gainer")
                || q.contains("gaining stocks")
                || q.contains("stocks going up")) {

            return "Open Stock Gainers from the TradingView market lists.";
        }

        // Losers
        if (q.contains("loser")
                || q.contains("losing stocks")
                || q.contains("stocks going down")) {

            return "Open Stock Losers from the TradingView market lists.";
        }

        return "I couldn't find a matching TradingView navigation option. Try asking about an instrument, indicator, timeframe, alert, drawing tool, or market list.";
    }
}