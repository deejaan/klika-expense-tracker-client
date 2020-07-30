This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Contributing
This section explains the process of contributing to the project.


### Git workflow

The main branch of the repository is `master` which contains the code that has been tested and approved.

When contributing to the project you should follow the following steps:

1. Pull the latest `master` version from remote to your local `master` branch
2. Check out to a new feature branch:
    
    The branch name should have the following format: `type/trello_ticket_id-description`
    
    Example: `feature/KET-1-set-up-git-workflow`
    
3.  After you do some work, you should commit the code with a short and clear commit message that accurately explains the work that you did. Before committing you should verify the following:
    
    3.1 Code is formatted and structured well
    
    3.2 All tests are passing
    
    Do not worry much about the number of commits  because they will be squashed once your code is merged.
    
4. When you commit your files push them to the remote branch.

After you finish the whole work and you are confident that it is completed according to Acceptance Criteria and Definition of Done, you can make a pull request to the `master` branch.

The name of your pull request should follow the naming from your branch. If the code is still in progress and you need the feedback from other team members you can put a `[WIP]` label in the PR name. In the pull request description you can provide the additional info that explains your work and you should assign other team members as reviewers.

When your PR is approved by all other team members, you can merge it. It is important that you **squash your commits** into one commit with commit message that follows the same naming convention as branch and PR.

**Important note: ** If there are conflicts you have to rebase your branch from `master`, resolve the conflicts locally and push to remote before merging

After your code is merged you can delete the feature branch both locally and remotely.

