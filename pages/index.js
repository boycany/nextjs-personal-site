import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Alert from "../components/alert";
import { getSortedPostsData, getMediumPosts } from "../lib/posts";
import useSWR from "swr";
import { format } from "date-fns";
import Link from "next/link";
import Date from "../components/date";

const apiUrl = process.env.API_URL;
// const apiUrl = "https://jsonplaceholder.typicode.com/posts"

export default function Home({ allPostsData, data }) {
    // console.log("allPostsData :>> ", allPostsData);
    // const { data, error, isLoading } = useSWR(apiUrl, fetcher);
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                {/* <p>
                    Hi, I'm <b>Red Chien</b>.
                </p> */}
                <p>
                    Practitioner of Web Application development. Self-motivated
                    and fast learning person with strong teamwork spirit. With
                    my passionate about research and thinking, I always get a
                    sense of fulfillment when figuring something out. As a
                    professional front-end software engineer, I commit myself to
                    developing practical, scalable, and maintainable solutions.
                </p>
            </section>
            <hr />
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Posts from File System</h2>
                {allPostsData.map(({ id, title, date }) => {
                    return (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    );
                })}
            </section>
            <hr />
            {!data ? (
                <Alert type="error">Fetch Medium Posts Error</Alert>
            ) : (
                <section
                    className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
                >
                    <h2 className={utilStyles.headingLg}>RSS feed on Medium</h2>
                    <ul className={utilStyles.list}>
                        {data.map(
                            ({ title, author, created, published, link }) => {
                                return (
                                    <li
                                        className={utilStyles.listItem}
                                        key={created}
                                    >
                                        <Link href={link} target="_blank">
                                            {title}
                                        </Link>
                                        <br />
                                        <small className={utilStyles.lightText}>
                                            {format(published, "LLLL d, yyyy")}
                                        </small>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </section>
            )}
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const data = await getMediumPosts();

    return {
        props: {
            allPostsData,
            data,
        },
    };
}
