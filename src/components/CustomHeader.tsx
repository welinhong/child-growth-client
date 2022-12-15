import Head from "next/head"
import React from "react"

export interface Props {}

const CustomHeader = ({}: Props): JSX.Element => {
  return (
    <Head>
      <title>체크키</title>
      <meta name="title" content="체크키" key="title" />
      <meta name="keywords" content="키확인,키성장,체크키,키,아이" key="keywords" />
      <meta name="description" content="키성장 체크 3초면 끝!" key="description" />
      <meta property="og:title" content="체크키" key="og:title" />
      <meta property="og:description" content="키성장 체크 3초면 끝!" key="og:description" />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8776339221322071"
        crossOrigin="anonymous"
      ></script>
    </Head>
  )
}

export default CustomHeader
