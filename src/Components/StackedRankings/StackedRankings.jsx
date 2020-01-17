import React from 'react';
import styled from "styled-components";

import RankingCard from "./RankingCard"

const Wrapper = styled.div`
    margin-top: 200px
`

function StackedRankings() {
    return (<Wrapper>
        StackedRankings 
        <RankingCard />
    </Wrapper>);
}

export default StackedRankings;