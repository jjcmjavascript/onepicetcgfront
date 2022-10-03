import React from 'react'; 
import {CardProvider} from '../providers/CardList'; 
import Container from '../../../components/Container';

import SideList from './SideList';
import Main from './Main';

function Deck(){
    return <>
        <CardProvider>
            <Container className="container-fluid">
                <SideList className="col-4 col-md-3" />
                <Main className="col-8 col-md-9 pt-2" />
            </Container>
        </CardProvider>
    </>; 
}

export default Deck;