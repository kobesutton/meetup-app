import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'

const NewMeetup = () => {

    const router = useRouter()

    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        const data = await response.json()
        router.push('/')
    }

    return (
        <>
        <Head>
            <title>Add a new meetup</title>
            <meta name="description" 
            content="Add your own custom meetup and create amazing connections"/>
        </Head>
        <NewMeetupForm onAddMeetup = {addMeetupHandler}/>
        </>
    )
}

export default NewMeetup;