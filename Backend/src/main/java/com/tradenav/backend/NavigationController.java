package com.tradenav.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    private final NavigationService navigationService;
    private final LLMService llmService;
    private final ObjectMapper objectMapper;

    public NavigationController(
            NavigationService navigationService,
            LLMService llmService,
            ObjectMapper objectMapper) {

        this.navigationService = navigationService;
        this.llmService = llmService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public NavigationData getNavigationData() {
        return navigationService.getNavigationData();
    }

    @PostMapping("/ask")
    public String askNavigation(
            @RequestBody NavigationRequest request) throws Exception {

        String navigationJson = objectMapper.writeValueAsString(
                navigationService.getNavigationData()
        );

        String prompt = """
                You are TradeNav, an intelligent navigation assistant
                for TradingView.

                Help users navigate TradingView using the supplied data.

                RULES:
                1. Use the supplied navigation data as your source of truth.
                2. Never invent buttons, URLs, or navigation paths.
                3. Give clear, simple instructions.
                4. Understand natural-language questions.
                5. If information is missing, say so.
                6. Distinguish homepage features from chart features.

                TRADINGVIEW NAVIGATION DATA:
                %s

                USER QUESTION:
                %s
                """.formatted(navigationJson, request.getQuestion());

        return llmService.askGemini(prompt);
    }
}