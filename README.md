# API Sing Me A Song

API to recommend songs through youtube links, the more people like a recommendation, more likely it is to be recommended to others.

## Routes

<details>
    <summary>POST /recommendations to add a new recommendation</summary>

        Body:
        {
            "name": "Rusted Root - Send Me On My Way",
            "youtubeLink": "https://www.youtube.com/watch?v=IGMabBGydC0"
        }

</details>
<details>
    <summary>POST /recommendations/:id/upvote
 to upvote a recommendation</summary>

        Increase score of song(id) by 1

</details>
<details>
    <summary>POST /recommendations/:id/downvote to downvote a recommendation</summary>
        
        Decrease score of song(id) by 1 
        If song score goes lower than -5, song is deleted
</details>
<details>
    <summary>GET /recommendations/random to get a random recommendation, higher probability of song with score > 10</summary>

        Response:
        {
            "id": 1,
            "name": "Rusted Root - Send Me On My Way",
            "youtubeLink": "https://www.youtube.com/watch?v=IGMabBGydC0",
            "score": 29
        }

</details>
<details>
    <summary>GET /recommendations/top/:amount to get a list of the 'amount' top scores songs </summary>
       
         Response:
        [
            {
            "id": 16,
            "name": "Toploader - Dancing in the Moonlight",
            "youtubeLink": "https://www.youtube.com/watch?v=0yBnIUX0QAE",
            "score": 117
            },
            {
            "id": 1,
            "name": "Rusted Root - Send Me On My Way",
            "youtubeLink": "https://www.youtube.com/watch?v=IGMabBGydC0",
            "score": 29
            }
        ]
</details>

## Tooling

NodeJs</br>
Express</br>
PostgreSQL</br>
Jest</br>

## How to run

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with the comands on the dump.sql file
4. Configure the `.env` file using the `.env.example` file
5. Run the app with:

```bash
npm start
```
