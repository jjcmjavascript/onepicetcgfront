import ContainerFluidDark from "../../../components/containerFluidDark";
import LoadingIcon from "../../../components/loadingIcon";

function WaitingArea() {
  return (
    <ContainerFluidDark className="text-center text-light">
      <h1 className="mt-5">Waiting for opponent</h1>
      <div className="mt-5">
        <LoadingIcon />
      </div>
    </ContainerFluidDark>
  );
}

export default WaitingArea;
