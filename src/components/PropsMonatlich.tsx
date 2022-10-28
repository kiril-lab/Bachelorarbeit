import { useState } from "react";

interface Props {
  januar20: number | undefined;
  februar20: number | undefined;
  märz20: number | undefined;
  april20: number | undefined;
  mai20: number | undefined;
  juni20: number | undefined;
  juli20: number | undefined;
  august20: number | undefined;
  september20: number | undefined;
  oktober20: number | undefined;
  november20: number | undefined;
  dezember20: number | undefined;
  januar21: number | undefined;
  februar21: number | undefined;
  märz21: number | undefined;
  april21: number | undefined;
  mai21: number | undefined;
  juni21: number | undefined;
  juli21: number | undefined;
  august21: number | undefined;
  september21: number | undefined;
  oktober21: number | undefined;
  november21: number | undefined;
  dezember21: number | undefined;
  januar22: number | undefined;
  februar22: number | undefined;
  märz22: number | undefined;
  april22: number | undefined;
  mai22: number | undefined;
  juni22: number | undefined;
  juli22: number | undefined;
  august22: number | undefined;
  september22: number | undefined;
  oktober22: number | undefined;
  november22: number | undefined;
  dezember22: number | undefined;
  classInfo: string;
}
const Monatlich = ({
  januar20,
  februar20,
  märz20,
  april20,
  mai20,
  juni20,
  juli20,
  august20,
  september20,
  oktober20,
  november20,
  dezember20,
  januar21,
  februar21,
  märz21,
  april21,
  mai21,
  juni21,
  juli21,
  august21,
  september21,
  oktober21,
  november21,
  dezember21,
  januar22,
  februar22,
  märz22,
  april22,
  mai22,
  juni22,
  juli22,
  august22,
  september22,
  oktober22,
  november22,
  dezember22,
  classInfo,
}: Props) => {
  const [year, setYear] = useState(0);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setYear(value);
  };
  return (
    <div className="flex flex-col mt-[2rem] w-[70%]">
      <div className="title">Proposals monatlich</div>
      <div className="title">
        <p className="mr-1">Year</p>
        <label>
          <select value={year} onChange={handleChange}>
            <option value={"2020"}>2020</option>
            <option value={"2021"}>2021</option>
            <option value={"2022"}>2022</option>
          </select>
        </label>
      </div>
      <div className="row">
        <div className={classInfo}>January</div>
        <div className={classInfo}>February</div>
        <div className={classInfo}>March</div>
        <div className={classInfo}>April</div>
        <div className={classInfo}>May</div>
        <div className={classInfo}>June</div>
      </div>
      {year == 2020 ? (
        <div className="row mb-5">
          <div className="w-[20%]">{januar20}</div>
          <div className="w-[20%]">{februar20}</div>
          <div className="w-[20%]">{märz20}</div>
          <div className="w-[20%]">{april20}</div>
          <div className="w-[20%]">{mai20}</div>
          <div className="w-[20%]">{juni20}</div>
        </div>
      ) : year == 2021 ? (
        <div className="row mb-5">
          <div className="w-[20%]">{januar21}</div>
          <div className="w-[20%]">{februar21}</div>
          <div className="w-[20%]">{märz21}</div>
          <div className="w-[20%]">{april21}</div>
          <div className="w-[20%]">{mai21}</div>
          <div className="w-[20%]">{juni21}</div>
        </div>
      ) : (
        <div className="row mb-5">
          <div className="w-[20%]">{januar22}</div>
          <div className="w-[20%]">{februar22}</div>
          <div className="w-[20%]">{märz22}</div>
          <div className="w-[20%]">{april22}</div>
          <div className="w-[20%]">{mai22}</div>
          <div className="w-[20%]">{juni22}</div>
        </div>
      )}
      <div className="row">
        <div className={classInfo}>July</div>
        <div className={classInfo}>August</div>
        <div className={classInfo}>September</div>
        <div className={classInfo}>October</div>
        <div className={classInfo}>November</div>
        <div className={classInfo}>December</div>
      </div>
      {year == 2020 ? (
        <div className="row mb-5">
          <div className="w-[20%]">{juli20}</div>
          <div className="w-[20%]">{august20}</div>
          <div className="w-[20%]">{september20}</div>
          <div className="w-[20%]">{oktober20}</div>
          <div className="w-[20%]">{november20}</div>
          <div className="w-[20%]">{dezember20}</div>
        </div>
      ) : year == 2021 ? (
        <div className="row mb-5">
          <div className="w-[20%]">{juli21}</div>
          <div className="w-[20%]">{august21}</div>
          <div className="w-[20%]">{september21}</div>
          <div className="w-[20%]">{oktober21}</div>
          <div className="w-[20%]">{november21}</div>
          <div className="w-[20%]">{dezember21}</div>
        </div>
      ) : (
        <div className="row mb-[5rem]">
          <div className="w-[20%]">{juli22}</div>
          <div className="w-[20%]">{august22}</div>
          <div className="w-[20%]">{september22}</div>
          <div className="w-[20%]">{oktober22}</div>
          <div className="w-[20%]">{november22}</div>
          <div className="w-[20%]">{dezember22}</div>
        </div>
      )}
    </div>
  );
};
export default Monatlich;
