import { gql } from '@apollo/client';
import { Box, Flex, Heading, Image, Link as ChakraLink, SimpleGrid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import Categories from '../components/Categories';
import Layout from '../components/Layout';
import client from '../src/apollo/Client';
import StripTags from '../src/escaping/StripTags';
import { prepareExcerpt } from '../src/helper-functions';
import styles from '../styles/Home.module.css';

const heroLinks = [
  {
    label: '💻 Software engineering',
    href: '/engineering-notes',
  },
  {
    label: '🛠️ Wires, servers, tiny machines',
    href: '/tiny-machines',
  },
  {
    label: '🛸 FPV, but make it cinematic',
    href: '/fpv-logbook',
  },
  {
    label: '🎬 Frames, cuts, and stories',
    href: '/frames-and-stories',
  },
];

const socialLinks = [
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/@souptik2001',
    description: 'Longer videos around builds, FPV, experiments, and the stories that need more than a quick post.',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/souptik_2001/',
    description: 'Shorter visual notes, behind-the-scenes frames, FPV clips, and the creative side slowly taking shape.',
  },
];

const journeyLanes = [
  {
    title: 'Engineering',
    items: [
      {
        marker: 'May 2025 - present',
        title: 'TeamUpdraft',
        startDate: '2025-05-01',
        endDate: 'present',
        status: 'active',
        description: [
          'Leading the universal UI library development.',
          'Building a next-gen managed WordPress hosting platform.',
        ],
      },
      {
        marker: 'Jan 2022 - May 2025',
        title: 'rtCamp',
        startDate: '2022-01-01',
        endDate: '2025-05-01',
        status: 'inactive',
        description: [
          'Senior Software Engineer: led development for an enterprise travel brand site and worked on a high-traffic e-commerce photo-printing service with previews, image manipulation, albums, bulk orders, and more.',
          'Software Engineer: built a decoupled WordPress and Next.js solution for comparing 50,000+ plugins, backed by Elasticsearch for efficient search.',
          'Intern: worked on miscellaneous internal projects, contributed a little to rtCamp\'s official website re-platforming, and spent a lot of time learning and exploring.',
        ],
      },
    ],
  },
  {
    title: 'Creative',
    items: [
      {
        marker: 'June 2026 - present',
        title: 'Building One More Take',
        href: 'https://www.instagram.com/one.more.take.co/',
        startDate: '2026-06-01',
        endDate: 'present',
        status: 'active',
        description: [
          'Turning years of personal visual practice into a creative studio.',
          'Bringing thoughtful, cinematic work to people, brands, and stories I care about.',
        ],
      },
      {
        marker: 'May 2025 - present',
        title: 'Visual experiments',
        startDate: '2025-05-01',
        endDate: 'present',
        status: 'inactive',
        description: [
          'Started by making things for myself: shooting, editing, and experimenting.',
          'Slowly developed a visual taste through small personal projects.',
        ],
      },
    ],
  },
];

const parseDate = (rawDate) => {
  if (!rawDate) return '';

  return rawDate.split('T')[0];
}

const getDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate === 'present' ? new Date() : new Date(endDate);

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }

  months = Math.max(months, 1);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} mo`;
  }

  if (remainingMonths === 0) {
    return `${years} yr`;
  }

  return `${years} yr ${remainingMonths} mo`;
}

export default function Home({posts, displayWPNotice, seoData}) {
  const recentPosts = posts?.data?.posts?.edges ?? [];

  return (
    <Layout
      customPageTitle={seoData?.openGraph?.frontPage?.title}
      customPageDescription={seoData?.openGraph?.frontPage?.description}
      customSeoMeta={{
        title: seoData?.openGraph?.frontPage?.title,
        description: seoData?.openGraph?.frontPage?.description,
        siteName: "Souptik's Blog",
        imageURL: seoData?.openGraph?.frontPage?.image?.link
      }}
      data={{
        link: process.env.NEXT_PUBLIC_BACKEND_URL,
      }}
      displayWPNotice="no"
    >
      <Head>
        <title>{"Souptik's Little Corner on the Internet"}</title>
      </Head>

      <Box className={styles.pageShell}>
        <Flex className={styles.hero}>
          <Box className={styles.portraitWrap}>
            <Image
              src="/profile-google-photo.jpg"
              alt="Souptik Datta"
              className={styles.portrait}
            />
            <Image
              src="/drone-whoosh.png"
              alt=""
              aria-hidden="true"
              className={styles.droneGraphic}
            />
          </Box>

          <Box className={styles.heroCopy}>
            <Text className={styles.eyebrow}>Souptik Datta</Text>
            <Heading as="h1" className={styles.heroTitle}>
              My little corner on the internet.
            </Heading>
            <Text className={styles.heroText}>
              A place for the things I build, fly, film, and keep tinkering with. <Text as="strong">Software</Text>, <Text as="strong">self-hosted setups</Text>, <Text as="strong">hardware experiments</Text>, <Text as="strong">FPV</Text>, and the visual work that is slowly taking shape around them.
            </Text>
            <Flex className={styles.heroActions}>
              {
                heroLinks.map((item) => (
                  <Link key={item.href} href={item.href} legacyBehavior passHref>
                    <ChakraLink className={`${styles.interestPill} ${styles.heroPill}`}>
                      <Text as="span">{item.label}</Text>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.linkCueArrow}
                        aria-hidden="true"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </ChakraLink>
                  </Link>
                ))
              }
            </Flex>
          </Box>
        </Flex>

        <Box as="section" className={styles.section}>
          <Flex className={styles.sectionHeader}>
            <Box>
              <Text className={styles.eyebrow}>Field notes</Text>
              <Heading as="h2" className={styles.sectionTitle}>
                Recent thoughts, builds, and experiments
              </Heading>
            </Box>
            <Link href="/blogs" legacyBehavior passHref>
              <ChakraLink className={styles.textLink}>
                View all
              </ChakraLink>
            </Link>
          </Flex>

          <SimpleGrid className={styles.postGrid}>
            {
              recentPosts.slice(0, 3).map((item) => {
                const post = item.node;

                return (
                  <Box key={post.id} className={styles.postCard}>
                    <Box className={styles.postCategories}>
                      <Categories categories={post?.categories?.edges ?? []} keyPrefix={post.slug} />
                    </Box>
                    <Link href={`/blog/${post.slug}`} legacyBehavior passHref>
                      <ChakraLink className={styles.postTitleLink}>
                      <Heading as="h3" className={styles.postTitle}>
                        {StripTags(post.title)}
                      </Heading>
                      </ChakraLink>
                    </Link>
                    <Text className={styles.postMeta}>
                      {parseDate(post.date)}
                    </Text>
                    <Text className={styles.postExcerpt}>
                      {prepareExcerpt(post.excerpt)}
                    </Text>
                    <Link href={`/blog/${post.slug}`} legacyBehavior passHref>
                      <ChakraLink className={styles.readPostLink}>
                        Read post
                      </ChakraLink>
                    </Link>
                  </Box>
                );
              })
            }
          </SimpleGrid>
        </Box>

        <Box as="section" className={styles.section}>
          <Flex className={styles.sectionHeader}>
            <Box>
              <Text className={styles.eyebrow}>Elsewhere</Text>
              <Heading as="h2" className={styles.sectionTitle}>
                Elsewhere, you will find my work
              </Heading>
            </Box>
          </Flex>

          <SimpleGrid className={styles.socialGrid}>
            {
              socialLinks.map((item) => (
                <ChakraLink key={item.title} href={item.href} isExternal className={styles.socialCard}>
                  <Text className={styles.socialLabel}>
                    {item.title}
                  </Text>
                  <Heading as="h3" className={styles.socialTitle}>
                    <Text as="span">{item.title === 'YouTube' ? 'Builds, flights, and longer notes' : 'Frames, clips, and behind the scenes'}</Text>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.linkCueArrow}
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </Heading>
                  <Text className={styles.socialDescription}>
                    {item.description}
                  </Text>
                </ChakraLink>
              ))
            }
          </SimpleGrid>
        </Box>

        <Box as="section" className={styles.section}>
          <Text className={styles.eyebrow}>Status</Text>
          <Heading as="h2" className={styles.sectionTitle}>
            Journey so far
          </Heading>

          <SimpleGrid className={styles.journeyGrid}>
            {
              journeyLanes.map((lane) => (
                <Box key={lane.title} className={styles.journeyLane}>
                  <Heading as="h3" className={styles.journeyLaneTitle}>
                    {lane.title}
                  </Heading>
                  <Box className={styles.journeyItems}>
                    {
                      lane.items.map((item) => {
                        const itemContent = (
                          <>
                          <Text className={styles.journeyMarker}>
                            {item.marker}
                          </Text>
                          <Flex className={styles.journeyTitleRow}>
                            <Heading as="h4" className={styles.journeyTitle}>
                              {item.title}
                            </Heading>
                            {
                              item.href &&
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.linkCueArrow}
                                aria-hidden="true"
                              >
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                              </svg>
                            }
                            <Text className={styles.journeyDuration}>
                              {getDuration(item.startDate, item.endDate)}
                            </Text>
                            {
                              item.href &&
                              <svg
                                className={styles.clapboard}
                                viewBox="0 0 50 34"
                                fill="none"
                                aria-hidden="true"
                              >
                                <g className={styles.clapboardImpactMarks}>
                                  <line className={styles.clapboardImpactMark} x1="40" y1="6" x2="45" y2="3" />
                                  <line className={styles.clapboardImpactMark} x1="39" y1="13" x2="46" y2="13" />
                                  <line className={styles.clapboardImpactMark} x1="38" y1="20" x2="45" y2="24" />
                                </g>
                                <g className={styles.clapboardTop}>
                                  <path d="M7 6.5H33V13.5H7Z" fill="#020617" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" strokeLinejoin="round" />
                                  <path d="M9 13.5L14 6.5" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
                                  <path d="M19 13.5L24 6.5" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
                                  <path d="M29 13.5L33 8" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
                                </g>
                                <g className={styles.clapboardBody}>
                                  <path d="M8 13H32V29H8Z" fill="#020617" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" strokeLinejoin="round" />
                                  <path d="M13 19H27" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M13 24H23" stroke="rgba(255,255,255,0.86)" strokeWidth="2" strokeLinecap="round" />
                                </g>
                              </svg>
                            }
                          </Flex>
                          {
                            Array.isArray(item.description)
                              ? (
                                <Box as="ul" className={styles.journeyDescriptionList}>
                                  {
                                    item.description.map((description) => (
                                      <Box as="li" key={description}>
                                        {description}
                                      </Box>
                                    ))
                                  }
                                </Box>
                              )
                              : (
                                <Text className={styles.journeyDescription}>
                                  {item.description}
                                </Text>
                              )
                          }
                          </>
                        );

                        if (item.href) {
                          return (
                            <ChakraLink
                              key={item.title}
                              href={item.href}
                              isExternal
                              className={`${styles.journeyItem} ${styles.journeyItemLink}`}
                            >
                              {itemContent}
                            </ChakraLink>
                          );
                        }

                        return (
                          <Box key={item.title} className={`${styles.journeyItem} ${item.status === 'inactive' ? styles.journeyItemInactive : ''}`}>
                            {itemContent}
                          </Box>
                        );
                      })
                    }
                  </Box>
                </Box>
              ))
            }
          </SimpleGrid>
        </Box>

      </Box>
    </Layout>
  );
}

export async function getStaticProps() {

  try {

    const posts = await client.query({
      query: gql`
        query fetchPosts {
          posts(first: 6) {
            edges {
              node {
                id
                date
                excerpt
                slug
                title
                author {
                  node {
                    name
                    firstName
                    lastName
                  }
                }
                categories {
                  edges {
                    node {
                    name
                    slug
                    }
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      `
    });

    const seoData = await client.query({
      query: gql`
        query seoData {
          seo {
            openGraph {
              frontPage {
                description
                title
                image {
                  altText
                  link
                }
              }
            }
          }
        }
      `
    })

    return {
      props: {
        posts,
        seoData: seoData?.data?.seo,
        displayWPNotice: process.env.DISPLAY_WP_SITE_NOTICE ?? null,
      }
    };
  } catch(error) {
		return {
			props:{},
			notFound: true
		};
	}

}
