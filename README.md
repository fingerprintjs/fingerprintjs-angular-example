## 🕸️ THIS PROJECT IS ARCHIVED AND NOT MAINTAINED 🕸️

### 🚙 USE THIS INSTEAD: [fingerprintjs/fingerprintjs-pro-angular](https://github.com/fingerprintjs/fingerprintjs-pro-angular)

First, create an app with the following command:

```
$ npx ng new my-project
```

After the app is created, enter the directory:

```
$ cd my-project
```

and host a server locally:

```
$ ng serve
```

If all goes well, you should be notified in terminal that your app is being hosted on port 4200.
Any changes you make to the source files will automatically update the page in browser.

## Editing files

Inside the "src/app" folder, you will find the two files edited from the default: `app.component.ts` and `app.component.html`.
The `app.component.ts` file is the file that will hold all of the logic (typescript) of the app, while the `app.component.html` file will hold both the html elements and the styles.

By default, the `app.component.html` is a template with info about Angular. For simplicity I have deleted all of these links.

1. First, you will want to install the npm package for FingerprintJS. Go to the console and run:

```
$ npm install @fingerprintjs/fingerprintjs-pro --save
```

You can now import the package into the top of the `app.component.ts` file:

```javascript
import { Component } from "@angular/core";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
```

2. Store Tokens.

I have directly inserted the tokens as variables. I am able to do so by whitelisting the domains in the customer dashboard, but you may want to keep these safe in a .env file instead so that these sensitive tokens arent revealed in your codebase. For the server API, it is recommended to use basic auth in request headers instead of using a token. You can read more about it <a href="https://dev.fingerprintjs.com/docs/server-api#authentication" target="_blank"> here</a>.

3. Getting a visitor ID.

In order to get a visitor ID, use the FingerprintJS object:

```typescript
// app.component.ts
public getVisitorID(): void {
    FingerprintJS.load({
        token: BROWSERAPIKEY,
    })
        .then((fp) => fp.get())
        .then((result) => {
        this.visitorId = result.visitorId;
        });
}
```

As you can see, this is a public method of the component class. You can call this function whenever you like, but in this example it is being called by the class constructor to get the visitorID when the page loads. The visitorID is then stored as a class attribute and will be referenced in the `app.component.html` file.

4. Querying the server API for visitor history:

The following function will query the server API. Please note that if your account is registered to the EU region, your base URL should be: https://eu.api.fpjs.io.

In the query below the visitorID and token is passed, as well as a "limitTo" variable, which will limit the amount of responses returned by the API. You can learn more about the query options <a href="https://dev.fingerprintjs.com/docs/server-api" target="_blank"> here</a>

```typescript
// app.component.ts
public callServerAPI(): void {
    fetch(
      `https://api.fpjs.io/visitors/${this.visitorId}?limit=${limitTo}&token=${SERVERAPIKEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.visits);
        this.responseSummary = `Received history of ${data.visits.length} visits:`;
        data = JSON.stringify(data.visits, null, 4);
        this.serverData = data;
      });
}
```

This is another public method owned by the component class. When this function is called it will save two class attributes: `responseSummary` and `serverData`. The important one here is serverData, which as you can see is the entire response formatted as an indented string.

## Further Steps

If you would like to know more, please visit our [Documentation](https://dev.fingerprintjs.com/docs) to see best practices and guides on how to implement them.

If you have a question, please contact us at [support@fingerprintjs.com](support@fingerprintjs.com).
