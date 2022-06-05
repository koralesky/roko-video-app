# ROKOvid video app

Project of streaming app based on [Roku API](https://thebetter.bsgroup.eu/swagger/index.html).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Tasks

### Main goal:

The goal of this task is to make an OTT web application containing video content with the
option of playback.

Video and data source:
Swagger and all the data you can find here:
https://thebetter.bsgroup.eu/swagger/index.html

Assumptions:
The application should consist of at least splash screen, main screen, and player.
Every helpful information you can find below.

Helpful information:
• API URL: https://thebetter.bsgroup.eu
• Your application should be hosted on http://localhost:3000 to avoid CORS problems
when polling the API
• Use only those API methods that are listed in the task content.
Pay attention to the types of API requests that are given in the content of the task
(GET, POST, PUT)

### 1. Splash Screen

During loading, the app should display a simple splash view.
On the splash screen, you can handle login, or you can add a separate view with login.

### 2. Home (main screen)

Requirements:
• Home should consist of list (or lists) with video content.
• For example: Home can contain two list with scroll possibility.
• Each list should have title and 15 items.
• Item should contain: title, cover (16:9 format).

All data for list you can get from API.

### 3. Player

Additional information:
• Player trigger – on click on the list item.
• You can use any player you know or download any open-source player from the web.

### 4. Login screen (optional)

Requirements:
• Add a login screen for registered users
