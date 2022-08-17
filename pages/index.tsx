import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import homeStyles from "../styles/Home.module.css"
import logo from "../public/logo.svg"
import { gql } from "graphql-request"
import { GraphQLResponse } from "graphql-request/dist/types"
import graphqlRequestClient from "../lib/clients/graphqlRequestClient"
import { useQuery } from "react-query"
import { Assets } from "../lib/interfaces/Assets"
import React from "react"
import Loader from "../components/Loader"
import Card from "../components/Card"

const GET_ALLASSEST_QUERY = gql`
  query GetAllAssets {
    asalist {
      result {
        assetId
        URL
        logo
        available
        name
      }
    }
  }
`

/* eslint-disable @next/next/no-img-element */
const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery<GraphQLResponse, Error, Assets[]>(
    "assets",
    async () => {
      return graphqlRequestClient.request(GET_ALLASSEST_QUERY)
    },
    {
      select: (response) => response.asalist.result,
    }
  )

  let assets: JSX.Element[] | string[] = []

  if (error) {
    return <p>Error</p>
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
        {isLoading ? (
          <Loader />
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
