import MeetupDetail from '../../components/meetups/MeetupDetail'

import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'

const MeetupDetails = (props) => {

    return (
        <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
        </Head>
        <MeetupDetail 
        title = {props.meetupData.title}
        description = {props.meetupData.description}
        address = {props.meetupData.address}
        image = {props.meetupData.image}
        />
        </>
    )
}

export const getStaticPaths = async () => {

       const client = await MongoClient.connect('mongodb+srv://KBsutton:basketman90@cluster0.su6hx.mongodb.net/meetupDatabase?retryWrites=true&w=majority')
       const db = client.db()
       const meetupsCollection = db.collection('meetups')
       const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        }))
    }
}

export const getStaticProps = async (context) => {

    //fetch api data

    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://KBsutton:basketman90@cluster0.su6hx.mongodb.net/meetupDatabase?retryWrites=true&w=majority')
       const db = client.db()

       const meetupsCollection = db.collection('meetups')

       const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId),
    })

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default MeetupDetails;