import { MongoClient } from 'mongodb'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'


const HomePage = (props) => {
    return (
        <>
        <Head>
          <title>React meetups</title>
          <meta name = 'description' content = 'Browse a list of meetups and add your own'/>
        </Head>
        <MeetupList meetups = {props.meetups}/>
        </>
    )
}



// export const getServerSideProps = async (context) => {

//     const req = context.req
//     const res = context.res
//     //fetch data from api
//     return {
//         props: {
//             meetups: dummy_meetups
//         }
//     }
// }

export const getStaticProps = async () => {

    //fetch data from api

       const client = await MongoClient.connect('mongodb+srv://KBsutton:basketman90@cluster0.su6hx.mongodb.net/meetupDatabase?retryWrites=true&w=majority')
       const db = client.db()
       const meetupsCollection = db.collection('meetups')

       const meetups = await meetupsCollection.find().toArray()

       client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                description: meetup.description,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage