import { ethers } from "ethers";
import { useEffect, useState } from "react";
import HauptComponent from "../HauptPropsComponent";
interface Props {
  quorum: string;
  threshold: string;
}
const Uniswap = ({ quorum, threshold }: Props) => {
  /*
  if (proposalsInAlpha.length > 0) {
    const args = proposalsInAlpha.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      const proposalDescription = x?.description;
      return {
        proposalId: proposalId,
        proposalDescription: proposalDescription,
      };
    });
    //console.log(proposals);
  }

    console.log(proposals);
  }
  if (proposalsInBravo.length > 0) {
    const args = proposalsInBravo.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      const proposalDescription = x?.description;
      return {
        proposalId: proposalId,
        proposalDescription: proposalDescription,
      };
    });
    //console.log(proposals);
  }
  if (votesInAlpha.length > 0) {
    const args = votesInAlpha.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  if (votesInAlpha2.length > 0) {
    const args = votesInAlpha2.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  if (votesInBravo.length > 0) {
    const args = votesInBravo.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  const [numberProp, setNumberProp] = useState(0);
  const number_proposals = () => {
    const id = data.map((i: any) => {
      return i.id;
    });
    return id.length;
  };
  useEffect(() => {
    setNumberProp(number_proposals());
  }, []);*/
  return (
    <HauptComponent
      title={""}
      stimmOption={""}
      quorum={quorum}
      threschold={threshold}
      allProposals={0}
      erfolgreicheP={0}
      erfolgQuote={0}
      linkErfolgsNachTyp={""}
      linkMonatlich={"/uniswap/monatlich"}
      numbVoters={0}
      linkUebersicht={"/uniswap/uebersicht"}
      classInfo={"infoUniswap"}
    />
  );
};
export default Uniswap;
