import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Alert from "../components/alert";
import { getSortedPostsData } from "../lib/posts";
import useSWR from "swr";
import { format } from "date-fns";
import Link from "next/link";
import Date from "../components/date";

const apiUrl = "https://v1.nocodeapi.com/redchien/medium/nnNgXroWaTVNWxLG";
// const apiUrl = "https://jsonplaceholder.typicode.com/posts"

const fetcher = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
};

export default function Home({ allPostsData }) {
    // console.log("allPostsData :>> ", allPostsData);

    const { data, error, isLoading } = useSWR(apiUrl, fetcher);
    // console.log("data :>> ", data);

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
            {error ? (
                <Alert type="error">Get Medium Error.</Alert>
            ) : isLoading ? (
                <Alert type="success">Loading...</Alert>
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

    return {
        props: {
            allPostsData,
        },
    };
}
