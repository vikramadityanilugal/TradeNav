package com.tradenav.backend;

import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.HttpOptions;

@Service
public class LLMService {

    private final Client client;

    public LLMService() {

        this.client = Client.builder()
                .httpOptions(
                    HttpOptions.builder()
                        .timeout(30000)
                        .build()
                )
                .build();
    }

    public String askGemini(String prompt) {

        long startTime = System.currentTimeMillis();

        try {

            System.out.println("TradeNav: Sending request to Gemini...");

            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-3.5-flash-lite",
                            prompt,
                            null
                    );

            long endTime = System.currentTimeMillis();

            System.out.println(
                "Gemini response received in "
                + (endTime - startTime) / 1000
                + " seconds."
            );

            return response.text();

        } catch (Exception e) {

            System.err.println("Gemini API Error:");
            e.printStackTrace();

            return "Gemini request failed: " + e.getMessage();
        }
    }
}