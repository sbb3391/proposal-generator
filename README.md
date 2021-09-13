# README

## About this project

#### This project is meant to solve a specific challenge that I have at my current work, where I am in sales and account management in the commercial printing industry. We manufacture equipment and software sales solutions for businesses selling printed materials of all kinds. A large part of my job is putting together proposal documents for clients and potential clients. Currently this process is tedious and time consuming. These are some of the challenges:

* involves multiple spreadsheets with hundreds of items that must be assembled into a valid configuration
* the documents are formatted manually using word processing software -- any changes to the proposal and pricing are manually entered which often means making multiple changes on the document for each proposal change
* The process can be error prone with all the manual entry

## Run the program with the following steps:

* ### fork and clone the repo
* ### in the terminal go to location "./react-proposal-generator/react-proposal-generator-api"
* ### run bundle install to load all gems
* ### run rails db:migrate
* ### go back to the root ("./react-proposal-generator")
* ### run npm install then npm start (you will be prompted to choose a new port since rails server is running at localhost:3000. Select Y)
* ### in your browser go to 'http://localhost:3001'
* ### Now you are able to build machines and proposals!