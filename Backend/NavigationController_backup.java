package com.tradenav.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    private final NavigationService navigationService;

    public NavigationController(NavigationService navigationService) {
        this.navigationService = navigationService;
    }

    @GetMapping
    public NavigationData getNavigationData() {
        return navigationService.getNavigationData();
    }

    @PostMapping("/ask")
    public String askNavigation(@RequestBody NavigationRequest request) {

        return navigationService.findAnswer(request.getQuestion());
    }
}