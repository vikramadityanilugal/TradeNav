package com.tradenav.backend;

import java.util.List;

public class NavigationData {

    private String app;
    private String assistant;
    private String version;
    private String purpose;
    private Navigation navigation;
    private List<ExampleUserQuery> example_user_queries;

    public NavigationData() {
    }

    public String getApp() {
        return app;
    }

    public String getAssistant() {
        return assistant;
    }

    public String getVersion() {
        return version;
    }

    public String getPurpose() {
        return purpose;
    }

    public Navigation getNavigation() {
        return navigation;
    }

    public List<ExampleUserQuery> getExample_user_queries() {
        return example_user_queries;
    }

    public static class Navigation {

        private Home home;
        private InstrumentSearch instrument_search;
        private Chart chart;

        public Navigation() {
        }

        public Home getHome() {
            return home;
        }

        public InstrumentSearch getInstrument_search() {
            return instrument_search;
        }

        public Chart getChart() {
            return chart;
        }
    }

    public static class Home {

        private String name;
        private List<NavigationItem> items;

        public Home() {
        }

        public String getName() {
            return name;
        }

        public List<NavigationItem> getItems() {
            return items;
        }
    }

    public static class InstrumentSearch {

        private String name;
        private List<String> activation;
        private String purpose;
        private List<NavigationItem> categories;
        private ExampleInstrument example;

        public InstrumentSearch() {
        }

        public String getName() {
            return name;
        }

        public List<String> getActivation() {
            return activation;
        }

        public String getPurpose() {
            return purpose;
        }

        public List<NavigationItem> getCategories() {
            return categories;
        }

        public ExampleInstrument getExample() {
            return example;
        }
    }

    public static class Chart {

        private String name;
        private String purpose;
        private List<NavigationItem> visible_options;

        public Chart() {
        }

        public String getName() {
            return name;
        }

        public String getPurpose() {
            return purpose;
        }

        public List<NavigationItem> getVisible_options() {
            return visible_options;
        }
    }

    public static class ExampleInstrument {

        private String user_query;
        private String symbol;
        private String action;

        public ExampleInstrument() {
        }

        public String getUser_query() {
            return user_query;
        }

        public String getSymbol() {
            return symbol;
        }

        public String getAction() {
            return action;
        }
    }

    public static class ExampleUserQuery {

        private String query;
        private String target;
        private String action;

        public ExampleUserQuery() {
        }

        public String getQuery() {
            return query;
        }

        public String getTarget() {
            return target;
        }

        public String getAction() {
            return action;
        }
    }
}