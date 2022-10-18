import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Uebersicht from "../../../components/Compound/Uebersicht";
import { CONTRACT_ABI_Alpha } from "../../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../../contracts/compound/abi_bravo";
import useVotesCast from "../../../hooks/useVotesCast";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
} from "../../../lib/const";
var eventArr: ethers.Event[];
const uebersicht: NextPage = () => {
  const [votes1, setVotes1] = useState(eventArr);
  const [votes2, setVotes2] = useState(eventArr);
  const VotesInAlpha = useVotesCast(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    9952490,
    12140390
  ).votes;
  const VotesInBravo = useVotesCast(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    12006099,
    15735133
  ).votes;
  useEffect(() => {
    setVotes1(VotesInAlpha);
    setVotes2(VotesInBravo);
  }, [VotesInAlpha, VotesInBravo, votes1, votes2]);
  return <Uebersicht votesInAlpha={votes1} votesInBravo={votes2} />;
};

export default uebersicht;
