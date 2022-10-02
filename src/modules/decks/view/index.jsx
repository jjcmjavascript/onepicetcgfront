import React from 'react'; 
import {CardProvider} from '../providers/CardList'; 
import SideList from './SideList';
import Container from '../../../components/Container';

function Deck(){

    return <>
        <CardProvider>
            <Container className="container-fluid">
                <SideList className="col-4"></SideList>
            </Container>
        </CardProvider>
    </>; 
}

export default Deck;