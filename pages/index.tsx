import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react"
import InfoModal from "@/components/InfoModal";
import UseInfoModal from "@/hooks/useInfoModal";

import Head from "next/head";



export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


export default function Home() {

  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = UseInfoModal();
    return (
      <>
      <Head>
        <title>Talha Netflix</title>
        <link rel="icon" href="/images/logo.png" />

      </Head>
      <InfoModal visible={isOpen} onClose={closeModal}/>
       <Navbar/>
       <Billboard/>

       <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
       </div>
      </>
    
  )
}
