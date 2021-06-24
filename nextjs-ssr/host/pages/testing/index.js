const SmartButton = (await import("remoteLib/SmartButton")).default;

const Page = () => {
    return (
      <div>
        NextJS now can use remote dependencies on both (client and server) !!
        <SmartButton />
      </div>
    );
  };
  
  export default Page;
  