import React, { useEffect, useState } from "react";
import { Button, Flex, Modal } from "antd";
import VolunteerModal from "../../components/client/modal/volunteer/VolunteerModal";
import GeneralTermCondictionModal from "../../components/client/GeneralTermCondictionModal/GeneralTermCondictionModal";

const JoinVoenture = () => {
    // general  terms & conditions. modal start
    const [generalTerm, setGeneralTerm] = useState(false);

    const closeGeneralTermModal = () => {
      setGeneralTerm(false);
    };
  
    // general  terms & conditions. modal end




    
  const [isVolunterModal, setIsVolunterModal] = useState(false);
  const openVolunterModal = () => {
    setIsVolunterModal(true);
  };

  useEffect(() => {
    document.body.style.overflow = isVolunterModal ? "hidden" : "auto";
  }, [isVolunterModal]);

  return (
    <>
      <div className="bg-[#ecebea] ">
        <div className=" max-w-[1480px] max-h-[608px] rounded-2xl shadow mx-auto bg-[#2D2722] ">
          <div className=" lg:py-[128px] py-10 lg:ml-[130px] text-center lg:text-start ">
            <p className=" text-xl lg:text-2xl text-white leading-8 ">
              Join with us
            </p>
            <h1 className=" text-3xl lg:text-7xl text-white leading-14 lg:leading-20 font-semibold ">
              Become a <br /> volunteer
            </h1>
            <div className="  ">
              <Button
                onClick={openVolunterModal}
                className=" block mx-auto applayBtn lg:mt-12 mt-5 hover:bg-[#27221D] px-3 "
              >
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </div>


      {/* volunter modal start */}
      <div className=" w-[600px]  z-50 ">
        
        <Modal
          visible={isVolunterModal}
          footer={null}
          width={500}
          height={800}
          // bodyStyle={{ padding: "20px" }}
          destroyOnClose
          closable={false}
          style={{ top: 0 }}
        >
          <VolunteerModal
            setIsVolunterModal={setIsVolunterModal}
            setGeneralTerm={setGeneralTerm}
          />
        </Modal>
      </div>
      {/* volunter modal end  */}





      {/* general term and condiction modal start  */}
      <div className=" ">
        <Modal
          width={"80%"}
          open={generalTerm}
          style={{ top: 0 }}
          onCancel={closeGeneralTermModal}
          footer={null}
          zIndex={1100}
          
        >
          <GeneralTermCondictionModal />
        </Modal>
      </div>
      {/* general term and condiction modal end  */}



    </>
  );
};

export default JoinVoenture;
