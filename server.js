const PORT = 8000
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
import fetch from 'node-fetch';




const API_KEY = process.env.API_KEY

app.post('/completions', async(req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           model: "gpt-3.5-turbo",
           messages: [{ role: "user", content: req.body.message}],
           max_tokens: 500,
        })
    }
    try {
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
       const data = await response.json()
       res.send(data)
       
    } catch (error) {
        console.error(error)
    }
})



app.listen( PORT, () => console.log("Your server is running on port " + PORT))