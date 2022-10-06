const { defineConfig  } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://onetrackui.azurewebsites.net/',

    env: {                                                                      //------Users setting here
      users: {     
            admin: {
              username: "jorji@ehtest.com",
              password: "admin", 
            }  
        },
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    hideXHR: true,
    numTestsKeptInMemory: 5,                                                    //------Reducing browser consumption
    defaultCommandTimeout: 8000,
    retries: 10,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});