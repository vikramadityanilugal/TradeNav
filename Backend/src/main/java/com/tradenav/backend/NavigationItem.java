package com.tradenav.backend;

import java.util.List;

public class NavigationItem {

    private String name;
    private String type;
    private String description;
    private String url;

    private List<String> keywords;
    private List<String> navigationPath;

    public NavigationItem() {
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public List<String> getNavigationPath() {
        return navigationPath;
    }
}