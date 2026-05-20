import HeroBanner from './HeroBanner'
import TopDoctors from './TopDoctors'
import ExtraSections from './ExtraSections'
import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        document.title = 'Home | DocAppoint'
    }, [])

    return (
        <div>
            <HeroBanner />
            <TopDoctors />
            <ExtraSections />
        </div>
    )
}

export default Home