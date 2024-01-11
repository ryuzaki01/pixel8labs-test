# Pixel8Labs Test

**Pixel8Labs Test** is a code test for [@pixel8labs](https://github.com/pixel8labs) developer.

## Setup
Generate env variables file
```shell
cp .env.example .env.local
```
Modify env variables
```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_SECRET

# to generate jwt secret 'openssl rand -base64 32'
JWT_SECRET=fv0vYFWaOs8TpjDodBOYwHkdpwdO8jXU2xIPUYgMDMY=

GITHUB_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET
```


## Commands

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
