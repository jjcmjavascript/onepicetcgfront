import React from 'react'; 
import {CardProvider} from '../providers/CardList'; 
import Container from '../../../components/Container';

import LeftSide from './LeftSideList';
import RightSide from './RightSide';
import Main from './Main';

function Deck(){
    return <>
        <CardProvider>
            <Container className="container-fluid">
                <LeftSide className="col-3" />
                <Main className="col-6 pt-2" />
                <RightSide className="col-3" />
            </Container>
        </CardProvider>
    </>; 
}

export default Deck;