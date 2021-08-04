import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getShortPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'



export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>~~爆炒鱿鱼徐~~</p>
        <p>
          生活总是多姿多彩的，而互联网，提供了更大的平台~~~{' '}</p>
        <p> 感谢<a href="https://nextjs.org/learn">Next.js</a>.</p>
        
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>文章列表</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getShortPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
