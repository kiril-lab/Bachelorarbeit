import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto my-0 sm:w-[80%]">
      <Head>
        <title>Untersuchung von DAOs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-center flex-col align-center text-center text-bold mt-[5rem] text-[24px]">
          <div className="mb-[2rem] text-[32px] font-bold">
            Untersuchungs Ergebnise
          </div>
          <div className="mb-[2rem] hover:text-[#FF0000]">
            <Link href="/compound">Compund DAO</Link>
          </div>
          <div className="mb-[2rem] hover:text-[#FF0000]">
            <Link href="/uniswap">Uniswap DAO</Link>
          </div>
          <div className="mb-[2rem] hover:text-[#FF0000]">
            <Link href="/">Cosmos DAO</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
