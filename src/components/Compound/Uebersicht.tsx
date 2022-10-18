import { ethers } from "ethers";
import { useEffect, useState } from "react";
import UebersichtTabelle from "./UebrsichtTabelle";

interface Props {
  votesInAlpha: ethers.Event[]|undefined;
  votesInBravo: ethers.Event[]|undefined;
}
const Uebersicht = ({ votesInAlpha, votesInBravo }: Props) => {
  const [number, setNumber] = useState(1);
  const handleChange = (event: any) => {
    setNumber(event.target.value);
  };
  useEffect(() => {
    handleChange;
  }, []);
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">
        <label className="flex">
          <div className="mr-[1rem]">Proposal</div>
          <select value={number} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
          </select>
        </label>
      </div>
      <div className="row">
        <div className="info">Voters</div>
        <div className="info">Votes</div>
        <div className="info">Stimme</div>
      </div>
      <UebersichtTabelle
        votesInAlpha={votesInAlpha}
        votesInBravo={votesInBravo}
        i={number}
      />
    </div>
  );
};
export default Uebersicht;
