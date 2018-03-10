import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from './components/Layout';
import PostLink from './components/PostLink';

import students from '../hero-students.svg';

const Heading = styled.h1`
  color: palevioletred;
  background: papayawhip;
`;

const SvgTest = styled.img`
  height: 300px;
  width: 500px;
`;

const Index = ({ shows }) => {
  return (
    <Layout>
      <SvgTest src={students} />
      <Heading>Batman TV Shows</Heading>
      <ul>
        {shows.map(({ show }) => (
          <li key={show.id}>
            <Link href={`/post?id=${show.id}`} as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Index.getInitialProps = async function getInitialProps() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const shows = await res.json();

  console.log(`Show data fetched. Count: ${shows.length}`);

  return { shows };
};

export default Index;
