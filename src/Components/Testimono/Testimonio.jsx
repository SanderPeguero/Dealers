import ubi from '../../assets/img/ubi.png'
import tele from '../../assets/img/tele.png'
import Gmai from '../../assets/img/Gmai.png'
import Propiethree from '../../assets/img/Propiethree.jpg'
import Propieuno from '../../assets/img/Propieuno.jpg'
import Propietwo from '../../assets/img/Propietwo.jpg'
const Testimonio = () => {

    return (
        <div className=" flex justify-center md:m-4 items-center xl:mt-36 max-md:px-5 bg-black">
  
        <div className=" flex flex-col mt-10 w-full max-w-[992px] max-md:mt-10 max-md:max-w-full ">
  
          <div data-aos="fade-right" className="bg-transparent md:px-6  flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="bg-transparent  flex flex-col">
              <div className="bg-transparent  text-2xl font-bold text-white  ">
                Testimonios
              </div>
  
              
            </div>
          </div>
  
          <div className="bg-transparent   mt-6 max-md:max-w-full">
            <div className="bg-transparent flex gap-5 max-md:flex-col max-md:gap-0">
              <div data-aos="flip-left" className="bg-transparent flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="bg-transparent flex flex-col grow justify-center font-semibold max-md:mt-5 max-md:max-w-full">
                  <div className=" flex flex-col rounded bg-slate-900 md:w-full">
                    <div className="flex overflow-hidden cursor-pointer relative flex-col items-end px-16 pt-6 pb-20 w-full text-lg text-white min-h-[199px] max-md:px-5 max-md:max-w-full">
                      <img
                         src={Propietwo} 
                        className="object-cover absolute inset-0 size-full lg:hover:scale-105 lg:hover:transition-transform lg:brightness-50 lg:hover:brightness-100 transition-transform"
                      />
                      
                    </div>
                    <div className="bg-transparent flex flex-col p-6 text-white max-md:px-5 max-md:max-w-full">
                      <div className="bg-transparent mt-4 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                        eget praesent gravida sed rutrum suspendisse eu.{" "}
                      </div>
                      <div className="bg-transparent gap-3 mt-10 text-sm">
                        <div className="bg-transparent flex-auto my-auto">By Jose Viccini</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-aos="zoom-in" className="bg-transparent  justify-between ml-5 h-full w-6/12 m-auto max-md:ml-0 max-md:w-full">
                <div className="bg-transparent flex  flex-col grow max-md:mt-5 md:max-w-full">
                  <div className=" pr-6 rounded bg-slate-900 lg:w-full lg:h-full max-md:pr-5 md:h-[140px] max-md:max-w-full">
                    <div className=" flex bg-transparent gap-5 max-md:gap-0">
                      <div className="flex overflow-hidden cursor-pointer flex-col w-[38%] max-md:ml-0 max-md:w-full">
                        <img
                          src={Propieuno}
                          className="shrink-0 lg:hover:scale-x-125 lg:hover:transition-transform lg:brightness-50 lg:hover:brightness-100 transition-transform max-w-full md:w-[140px] lg:w-full lg:h-full md:h-[140px] aspect-square w-full h-full "
                        />
                      </div>
                      <div className="bg-transparent px-2 py-2 md:py-1 md:px-0 flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                        <div className="bg-transparent flex flex-col self-stretch my-auto font-semibold text-white ">
                          <div className="bg-transparent mt-2 text-[12px] lg:text-[20px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </div>
                          <div className="bg-transparent  gap-2 mt-4 p-1 lg:text-[15px] text-[10px]">
                            <div className="bg-transparent flex-auto my-auto">
                              By Cameron Escolastico - May, 28 2024
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div data-aos="zoom-in" className="flex pr-6 rounded mt-14 bg-slate-900 lg:w-full lg:h-full max-md:pr-5 md:h-[140px] max-md:max-w-full">
                    <div className="bg-transparent flex gap-5 max-md:gap-0">
                      <div className="flex flex-col cursor-pointer overflow-hidden w-[38%] max-md:ml-0 max-md:w-full">
                        <img
                          src={Propiethree}
                          className="shrink-0 lg:hover:scale-x-125 lg:hover:transition-transform lg:brightness-50 lg:hover:brightness-100 transition-transform max-w-full md:w-[140px] lg:w-full lg:h-full md:h-[140px] aspect-square w-full h-full "
                        />
                      </div>
                      <div className="bg-transparent md:py-1 md:px-0 px-2 py-2 flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                        <div className="bg-transparent flex flex-col self-stretch my-auto font-semibold text-white ">
                          <div className="bg-transparent mt-2 text-[12px] lg:text-[20px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </div>
                          <div className="bg-transparent flex gap-2 mt-4 p-1 lg:text-[15px] text-[10px]">
                            <div className="bg-transparent flex-auto my-auto">
                              By Carla Baptista - May, 28 2024
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          
  
  
  
        </div>
      </div>
    );
}

export default Testimonio