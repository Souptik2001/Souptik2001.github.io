import { Box, Heading } from '@chakra-ui/layout';
import { style } from '@motionone/dom';
import styles from '../styles/Home.module.css';
import Blogcard from './components/Home/Blogcard';
import Layout from './components/Layout';

export default function Home() {

  const blogs = [
    {
      title: 'Current Status📝',
      excerpt: 'Software Engineer at rtCamp',
      content: ''
    }
  ]

  return (
    <Layout>
      <Box height="100vh" className={styles.firstSec} id={styles.firstSec_i}>
        <Box className={styles.intro}>
            <Heading color="white" letterSpacing="8px" fontFamily="Heboo, Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" fontWeight="800">
              <span id={styles.i_text}><em><span color='rgba(212, 182, 84, 0.699)' id={style.cursor}>|</span></em><span>H</span><span>e</span><span>l</span><span>l</span><span>o</span><span>.</span><span>.</span><span>👱🏼</span></span><em><span color="rgba(212, 182, 84, 0.699)" id={styles.cursor}>|</span></em>
            </Heading>
            <Box className={styles.blogs} id={styles.blogs}>
              {
                blogs.map((item, index) => {
                  // The index will not change dynamically. So, safe to use index.
                  return (
                    <Blogcard key={`key-${index}`} data={item} styles={styles} />
                  );

                })
              }
            </Box>
        </Box>
      </Box>
    </Layout>
  );
}
