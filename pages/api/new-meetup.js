import { MongoClient } from 'mongodb'
//api/new-meetup
//post /api/new-meetup

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const data = req.body

       const client = await MongoClient.connect('mongodb+srv://KBsutton:basketman90@cluster0.su6hx.mongodb.net/meetupDatabase?retryWrites=true&w=majority')
       const db = client.db()

       const meetupsCollection = db.collection('meetups')
       
       try {
        const result = await meetupsCollection.insertOne(data)
        res.status(201).json({ message: 'Meetup successfully added!'})
       } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
       }

       client.close()
    }
}

export default handler