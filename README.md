# Simple Contract
An app that simplifies and breaks down the legal documents, we provide complete analysis of the document and also provide a feature to translate to multiple Indian languages.

#### Problem
In India, millions of people living in rural areas,farmers and people living in slum areas are cheated, and their land is grabbed.
#### How does this happen ?
These people are tricked into signing complex legal documents, which are shown as if they would benefit them but they are cheated.
Eg : Farmers entering into contract farming with complex terms, end up with the corporate or private buyer cheating them and grabbing their lands.

Generally legal documents and agreements are difficult to understand and often people face difficulties in moving forward with it.

#### So what does our solution do.
We simplify and break down the legal document, we provide complete analysis of the document and also provide a feature to translate to multiple Indian languages.

Along with the farmers,people living in rural and slum areas, our solution can help any induvidual or group who is trying to wrap their head around a complex legal contract or document.

## Inspiration

- Help general public and people to understand legal documents and help native and regional language speakers of India.
- The idea to impact and make a good change


## Workflow
![Workflow](https://i.ibb.co/hVQQwvH/11.png)
## How we built it

Everything Azure 💖
- We used **Azure Computer Vision OCR API - Cognitive Services**  for getting text from legal documents
- **Azure Text Analytics API - Cognitive Services** to get entities,key phrases and sentiment from the text.
- **Azure Translation API - Cognitive Services** to translate the results into multiple Indian Languages.
- We used node.js for our backend along with MongoDB used to store user data and manage sessions.The app is hosted using **Azure App Services**
- We are using React.js for our Frontend and hosted using **Azure App Services**
- For summarizartion, we used Gensim summarization - which uses text ranking Algorithm to get the sumamary.We created a Flask app and exposed the API to get the summary.The Flask app is hosted using **Azure App Services**


## Accomplishments we are proud of 
- How the final website came about.
- How this website has great possibilities to add value for millions of Indians.

## Tech Stack
![Tech STack](https://i.ibb.co/r0GCy6t/12.png)


## Try it out
[Demo Link - Click here](https://simple-contract.azurewebsites.net/)
or copy and paste this URL in your browser https://simple-contract.azurewebsites.net/




## Created by 
[Abhay R Patel](https://github.com/abhayrpatel10)
[Rishav Raj Jain](https://github.com/rishavrajjain)


