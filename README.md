## Getting Started (Contributors Only)
1. Clone the repo
2. Grab the secrets
3. run `./scripts/firstTimeSetup.sh` (see "Available Scripts" for more info)
4. run the backend and frontend
    - same terminal: run `npm run dev`
    - separate terminals: run `npm start` in one terminal (frontend) and then `cd backend/` and then run `node server.js` for the backend

---------------------------------------------------------------------------------------------------

## About Arbitrium

This web app (Arbitrium) is a review tool built for non-profit organizations. It is used to help non-profits make decisions on how to allocate grant funding and currently has a 3 part-process:
1. The non-profit releases an application and Arbitrium collects the responses
2. A group of reviewers, usually community leaders, picked by the non-profit are then asked to rate and rank the applications
3. Arbitrium provides dashboards to visualize the review rate, the average rating and the average ranking of each application

### Team

Project Lead: [Greg Maxin](https://github.com/GodGreg)\
Product Manager: [Brittany Lau](https://github.com/brittanylau)\
Senior Developers: [Xin Hao Zhang](https://github.com/xinhaoz), [Sherry Li](https://github.com/sherryhli), [Hyunzee Kim](https://github.com/hyunzeekim), [Ahmed Hamodi](https://github.com/ahmedhamodi)

---------------------------------------------------------------------------------------------------

## Usage Stats

### Current Users (non-profit organizations)
- United Way Waterloo Region Communities
- Social Venture Partners Waterloo Region

### Usage
- 208 Applications Submitted
- 1388 Review Done
- 63 Users
- 7 Grant Application Rounds Supported
- $2M+ in Funding

---------------------------------------------------------------------------------------------------
## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

In the backend folder run
### `node server.js`

This will start the backend


---------------------------------------------------------------------------------------------------
chmod u+x "scriptname" (This will give you execute permissions for the script)
### `./scripts/deploy.sh`

Builds the app and stores it in the /build folder
The build is then uploaded/deployed to firebase https://decision-io.firebaseapp.com/

### `./scripts/firstTimeSetup.sh`

Installs nodejs and npm
Installs/Updates all npm modules outlined in package.json for the project in the current directory
