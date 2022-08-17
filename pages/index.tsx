import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import homeStyles from "../styles/Home.module.css"
import logo from "../public/logo.svg"
import React from "react"
import Loader from "../components/Loader"
import Card from "../components/Card"
import useAssets from "../hooks/useAssets"


const Home: NextPage = () => {
  const { isLoading, isError, error, data } = useAssets()

  let assets: JSX.Element[] | string[] = []

  let loaderErrorExcerpt: JSX.Element | undefined = undefined

  if (isError) {
    console.error(error)
    loaderErrorExcerpt = <p className={homeStyles.error_text}>We cannot process your request right now</p>
  }

  if(isLoading){
    loaderErrorExcerpt = <Loader/>
  }

  if (data) {
    assets = data.map((asset) => (
      <Card
        assetId={asset.assetId}
        key={asset.assetId}
        URL={asset.URL}
        logo={asset.logo}
        name={asset.name}
        available={asset.available}
      />
    ))
  }


  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Asalytics Asssessment</title>
        <meta name="description" content="Asalytics Asssessment done by Tobianointing" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <header className={homeStyles.header}>
        <div className={homeStyles.logo_wrapper}>
          <Image src={logo} alt="logo" height={62} width={30} />
          <span className={homeStyles.logo_text}>SAlytics</span>
        </div>

        <a href="" className={homeStyles.cta_btn}>
          ANALYZE ASAs
        </a>
      </header>

      <main>
        <div className={homeStyles.hero}>List of Algorand Standard Assets on ASAlytics</div>
        {loaderErrorExcerpt ? (
         loaderErrorExcerpt
        ) : (
          <section className={homeStyles.assets}>
            {assets}
          </section>
        )}
      </main>
    </div>
  )
}

export default Home
