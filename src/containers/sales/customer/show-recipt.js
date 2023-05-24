import React, { useCallback, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


function ShowRecipt() {


    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback(shouldZoom => {
      setIsZoomed(shouldZoom)
    }, [])

  

       return (
        <>
            <Navbar/>
            <Sidebar/> 
            <div className="main-content">
                <section className="section" style={{marginLeft:"200px"}}>
                    <div className="row">
                        <div className="col-12">
                            <div class="card-body">
                            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                                <img
                                    alt="That wanaka tree, alone in the water near mountains"
                                    src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg"
                                    width="700"
                                />
                            </ControlledZoom>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
                


        
        </>
       );
    }

export default ShowRecipt;