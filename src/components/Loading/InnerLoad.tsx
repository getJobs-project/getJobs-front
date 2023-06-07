import React from "react";
import { Oval } from "react-loader-spinner";

function InnerLoad({ height }): JSX.Element {
  return (
    <>
      <div className="flex items-center justify-center">
        <Oval
          height={height}
          width={height}
          color="#FFFFFF"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#a9a9a9"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </>
  );
}

export default InnerLoad;
