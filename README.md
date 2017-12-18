# Frontend

This was built with node and inferno (which is a lightweight react alternative).

Styling is automatically enforced by [prettier](https://prettier.io/)

## Installation

* Enter the directory.
* Installing yarn package manager : https://yarnpkg.com/en/docs/install
* We need node version greater than 6. If your distro does not provide that, you can use nvm to install it

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
nvm install node
source ~/.bashrc
```

* Installing dependencies:

```
yarn install
```

## Starting Frontend dev server

This is the dev server which will auto refresh when you edit any file

Open a new window in your Terminal.
Enter the directory.

```
yarn start
```

## Building frontend

This will build the output files and can be used for deployment or when you want to only work on the backend

```
yarn build
```
