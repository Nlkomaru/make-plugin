import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Home() {
    return <Redirect to={useBaseUrl('create-plugin/normal')} />;
}

export default Home;